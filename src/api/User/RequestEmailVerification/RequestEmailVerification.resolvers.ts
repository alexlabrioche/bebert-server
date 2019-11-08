import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import User from '../../../entity/User';
import Verification from '../../../entity/Verification';
import { sendVerificationEmail } from '../../../utils/sendEmail';
import { RequestEmailVerificationResponse } from '../../../types/graph';

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: authResolver(
      async (_, __, context): Promise<RequestEmailVerificationResponse> => {
        const loggedUser: User = context.req.user;
        if (loggedUser.email && !loggedUser.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({ payload: loggedUser.email });
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: loggedUser.email,
              target: 'EMAIL',
            }).save();

            await sendVerificationEmail(loggedUser.fullName, newVerification.key);
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
        }
        return {
          ok: false,
          error: "L'utilisateur n'a pas d'email à vérifier",
        };
      },
    ),
  },
};

export default resolvers;
