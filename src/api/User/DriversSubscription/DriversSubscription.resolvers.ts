import { withFilter } from 'graphql-yoga';
import User from '../../../entity/User';

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, context) => context.pubSub.asyncIterator('driverUpdate'),
        (payload, args, context) => {
          const logguedUser: User = context.connectionContext.currentUser;
          console.info(payload, logguedUser);

          const {
            DriversSubscription: { lastLat: driverLng, lastLng: driverLat },
          } = payload;
          const { lastLat: userLat, lastLng: userLng } = logguedUser;
          return (
            driverLat >= userLat - 0.05 &&
            driverLat <= userLat + 0.05 &&
            driverLng >= userLng - 0.05 &&
            driverLng <= userLng + 0.05
          );
        },
      ),
    },
  },
};
export default resolvers;
