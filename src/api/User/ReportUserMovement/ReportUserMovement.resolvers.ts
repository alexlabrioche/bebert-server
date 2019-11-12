import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../utils/authResolver';
import { ReportUserMovementMutationArgs, ReportUserMovementResponse } from '../../../types/graph';
import User from '../../../entity/User';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    ReportUserMovement: authResolver(
      async (
        _,
        args: ReportUserMovementMutationArgs,
        { req, pubSub },
      ): Promise<ReportUserMovementResponse> => {
        const loggedUser: User = req.user;
        const nonNullArgs = cleanNullArgs(args);
        try {
          await User.update({ id: loggedUser.id }, { ...nonNullArgs });
          const updatedUser = await User.findOne({ id: loggedUser.id });
          pubSub.publish('driverUpdate', { DriversSubscription: updatedUser });
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
