import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import { AddPlaceMutationArgs, AddPlaceResponse } from '../../../types/graph';
import User from '../../../entity/User';
import Place from '../../../entity/Place';

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: authResolver(
      async (_, args: AddPlaceMutationArgs, context): Promise<AddPlaceResponse> => {
        const loggedUser: User = context.req.user;
        try {
          await Place.create({ ...args, user: loggedUser }).save();
          return {
            ok: true,
            error: null,
          };
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
