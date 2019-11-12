import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import User from '../../../entity/User';
import { GetRideResponse, GetRideQueryArgs } from '../../../types/graph';
import Ride from '../../../entity/Ride';

const resolvers: Resolvers = {
  Query: {
    GetRide: authResolver(
      async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
        const logguedUser: User = req.user;
        try {
          const ride = await Ride.findOne({ id: args.rideId });
          if (ride) {
            if (ride.passengerId === logguedUser.id || ride.driverId === logguedUser.id) {
              return {
                ok: true,
                error: null,
                ride,
              };
            } else {
              return {
                ok: false,
                error: 'Pas autorisé',
                ride: null,
              };
            }
          } else {
            return {
              ok: false,
              error: 'Course non trouvée',
              ride: null,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null,
          };
        }
      },
    ),
  },
};

export default resolvers;
