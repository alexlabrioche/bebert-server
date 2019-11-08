import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import { CompleteEmailVerificationResponse } from '../../../types/graph';
import Verification from '../../../entity/Verification';

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: authResolver(
      async (_, args, context): Promise<CompleteEmailVerificationResponse> => {
        const loggedUser = context.req.user;
        const { key } = args;
        if (loggedUser.email) {
          try {
            const verification = await Verification.findOne({ key, payload: loggedUser.email });
            if (verification) {
              loggedUser.verifiedEmail = true;
              loggedUser.save();
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "Pas possible de vérifier l'Email",
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        }
        return {
          ok: false,
          error: '',
        };
      },
    ),
  },
};
export default resolvers;
