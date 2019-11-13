import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";
import User from "../../../entity/User";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import Ride from "../../../entity/Ride";
import Chat from "../../../entity/Chat";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: authResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const logguedUser: User = req.user; // Driver
        if (logguedUser.isDriving) {
          try {
            let ride: Ride | undefined;
            if (args.status === "ACCEPTED") {
              ride = await Ride.findOne(
                { id: args.rideId, status: "REQUESTING" },
                { relations: ["passenger"] }
              );
              if (ride) {
                ride.driver = logguedUser;
                logguedUser.isTaken = true;
                ride.save();
                const chat = await Chat.create({
                  driver: logguedUser,
                  passenger: ride.passenger
                }).save();
                ride.chat = chat;
                ride.save();
              } else {
                ride = await Ride.findOne({
                  id: args.rideId,
                  driver: logguedUser
                });
              }
            }
            if (ride) {
              ride.status = args.status;
              pubSub.publish("rideUpdate", { RideStatusSubscription: ride });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Impossible de mettre à jour"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "Activez le mode conducteur"
          };
        }
      }
    )
  }
};
export default resolvers;
