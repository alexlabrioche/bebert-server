import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import { GetNearbyRideResponse } from '../../../types/graph';
import User from '../../../entity/User';
import Ride from '../../../entity/Ride';
import { getRepository, Between } from 'typeorm';

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: authResolver(
      async (_, __, { req }): Promise<GetNearbyRideResponse> => {
        const logguedUser: User = req.user;
        if (logguedUser.isDriving) {
          try {
            const { lastLat, lastLng } = logguedUser;
            const ride = await getRepository(Ride).findOne({
              status: 'REQUESTING',
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05),
            });
            if (ride) {
              return {
                ok: true,
                error: null,
                ride,
              };
            } else {
              return {
                ok: true,
                error: null,
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
        } else {
          return {
            ok: false,
            error: 'VOus devez activer le mode conducteur',
            ride: null,
          };
        }
      },
    ),
  },
};

export default resolvers;
