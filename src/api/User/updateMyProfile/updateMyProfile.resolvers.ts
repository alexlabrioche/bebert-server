import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import { UpdateMyProfileMutationArgs, updateMyProfileResponse } from '../../../types/graph';
import User from '../../../entity/User';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    updateMyProfile: authResolver(
      async (_, args: UpdateMyProfileMutationArgs, context): Promise<updateMyProfileResponse> => {
        const loggedUser: User = context.req.user;
        const nonNullArgs = cleanNullArgs(args);
        try {
          // Bugfix : I need an instance of a user to trigger "BeforeUpdate" from the User entity
          if (args.password !== null) {
            loggedUser.password = args.password;
            loggedUser.save();
          }
          await User.update({ id: loggedUser.id }, { ...nonNullArgs });
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
