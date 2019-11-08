import { Resolvers } from '../../../types/resolvers';
import { EmailSignInMutationArgs, EmailSignInResponse } from '../../../types/graph';
import User from '../../../entity/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "Pas d'utilisateur lié à cet email",
            token: null,
          };
        }
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(user.id);

          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: 'mauvais mot de passe',
            token: null,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};
export default resolvers;
