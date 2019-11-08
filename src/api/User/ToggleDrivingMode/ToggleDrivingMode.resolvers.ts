import { Resolvers } from '../../../types/resolvers';
import User from '../../../entity/User';
import authResolver from '../../../utils/authResolver';
import { ToggleDrivingModeResponse } from '../../../types/graph';

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: authResolver(
      async (_, __, context): Promise<ToggleDrivingModeResponse> => {
        const loggedUser: User = context.req.user;
        loggedUser.isDriving = !loggedUser.isDriving;
        loggedUser.save();
        return {
          ok: true,
          error: null,
        };
      },
    ),
  },
};
export default resolvers;
