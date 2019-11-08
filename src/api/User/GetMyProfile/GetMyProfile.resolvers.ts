import authResolver from '../../../utils/authResolver';
import { GetMyProfileResponse } from '../../../types/graph';

const resolvers = {
  Query: {
    GetMyProfile: authResolver(
      async (_, __, context): Promise<GetMyProfileResponse> => {
        const { user } = context.req;
        return {
          ok: true,
          error: null,
          user,
        };
      },
    ),
  },
};

export default resolvers;
