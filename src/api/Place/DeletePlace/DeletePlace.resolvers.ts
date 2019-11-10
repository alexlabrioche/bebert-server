import authResolver from '../../../utils/authResolver';
import User from '../../../entity/User';
import { DeletePlaceResponse, DeletePlaceMutationArgs } from '../../../types/graph';
import Place from '../../../entity/Place';

const resolvers = {
  Mutation: {
    DeletePlace: authResolver(
      async (_, args: DeletePlaceMutationArgs, context): Promise<DeletePlaceResponse> => {
        const logguedUser: User = context.req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === logguedUser.id) {
              place.remove();
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: 'Pas autorisé',
              };
            }
          } else {
            return {
              ok: false,
              error: "La place n'existe pas",
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      },
    ),
  },
};

export default resolvers;
