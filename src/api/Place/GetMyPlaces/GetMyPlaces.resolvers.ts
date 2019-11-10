import authResolver from '../../../utils/authResolver';
import User from '../../../entity/User';
import { GetMyPlacesResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: authResolver(
      async (_, __, context): Promise<GetMyPlacesResponse> => {
        try {
          const user = await User.findOne({ id: context.req.user.id }, { relations: ['places'] });
          if (user) {
            return {
              ok: false,
              error: null,
              places: user.places,
            };
          } else {
            return {
              ok: false,
              error: 'Utilisateur non trouvé',
              places: null,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null,
          };
        }
      },
    ),
  },
};
export default resolvers;
