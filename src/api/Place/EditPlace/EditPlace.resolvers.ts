import authResolver from '../../../utils/authResolver';
import { EditPlaceResponse, EditPlaceMutationArgs } from '../../../types/graph';
import User from '../../../entity/User';
import Place from '../../../entity/Place';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers = {
  Mutation: {
    EditPlace: authResolver(
      async (_, args: EditPlaceMutationArgs, context): Promise<EditPlaceResponse> => {
        const logguedUser: User = context.req.user;

        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === logguedUser.id) {
              const nonNullsArgs = cleanNullArgs(args);

              await Place.update({ id: args.placeId }, { ...nonNullsArgs });
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: 'Non autorisé',
              };
            }
          } else {
            return {
              ok: false,
              error: 'Place non trouvé',
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
