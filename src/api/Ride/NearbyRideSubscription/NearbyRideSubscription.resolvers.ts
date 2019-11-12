import { withFilter } from 'graphql-yoga';
import User from '../../../entity/User';

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideRequest'),
        (payload, args, { connectionContext }) => {
          const logguedUser: User = connectionContext.currentUser; // the driver
          const {
            NearbyRideSubscription: { pickUpLat, pickUpLng },
          } = payload;
          const { lastLat: userLat, lastLng: userLng } = logguedUser;
          return (
            pickUpLat >= userLat - 0.05 &&
            pickUpLat <= userLat + 0.05 &&
            pickUpLng >= userLng - 0.05 &&
            pickUpLng <= userLng + 0.05
          );
        },
      ),
    },
  },
};
export default resolvers;
