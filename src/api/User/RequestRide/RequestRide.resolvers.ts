import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../types/graph";
import User from "../../../entity/User";
import Ride from "../../../entity/Ride";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: authResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const logguedUser: User = req.user;
        if (!logguedUser.isRiding && !logguedUser.isDriving) {
          try {
            const ride: Ride = await Ride.create({
              ...args,
              passenger: logguedUser
            }).save();
            pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
            logguedUser.isRiding = true;
            logguedUser.save();
            return {
              ok: true,
              error: null,
              ride
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              ride: null
            };
          }
        } else {
          return {
            ok: false,
            error:
              "Vous ne pouvez pas chercher une nouvelle course pendant une course",
            ride: null
          };
        }
      }
    )
  }
};
export default resolvers;
