import { withFilter } from 'graphql-yoga';
import User from '../../../entity/User';

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideUpdate'),
        (payload, _, { connectionContext }) => {
          const logguedUser: User = connectionContext.currentUser; // the driver
          const {
            RideStatusSubscription: { driverId, passengerId },
          } = payload;
          return logguedUser.id === driverId || logguedUser.id === passengerId;
        },
      ),
    },
  },
};
export default resolvers;
