import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import { GetNearbyDriversResponse } from '../../../types/graph';
import User from '../../../entity/User';
import { getRepository, Between } from 'typeorm';

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: authResolver(
      async (_, __, context): Promise<GetNearbyDriversResponse> => {
        const logguedUser: User = context.req.user;
        const { lastLat, lastLng } = logguedUser;
        try {
          // call table User without active repository initiated in typeORM entities
          // Between filter must be called with getRepository
          const drivers: User[] = await getRepository(User).find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05),
          });
          return {
            ok: false,
            error: 'pas autorisé',
            drivers,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null,
          };
        }
      },
    ),
  },
};
export default resolvers;
