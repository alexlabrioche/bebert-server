import { Resolvers } from '../../../types/resolvers';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from '../../../types/graph';
import User from '../../../entity/User';
import createJWT from '../../../utils/createJWT';
import Verification from '../../../entity/Verification';
import { sendVerificationEmail } from '../../../utils/sendEmail';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
      const { email, phoneNumber } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: "L'email est deja dans la base de données, veuillez vous identifier",
            token: null,
          };
        } else {
          const phoneVerification = await Verification.findOne({ payload: phoneNumber });
          if (phoneVerification) {
            const newUser = await User.create({ ...args }).save();
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: 'EMAIL',
              }).save();
              await sendVerificationEmail(newUser.fullName, emailVerification.key);
            }
            const token = createJWT(newUser.id);
            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            return {
              ok: false,
              error: "Vous n'avez pas vérifié votre numéro de téléphone",
              token: null,
            };
          }
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
