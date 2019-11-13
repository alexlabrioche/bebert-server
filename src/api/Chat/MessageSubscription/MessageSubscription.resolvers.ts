import { withFilter } from "graphql-yoga";
import User from "../../../entity/User";
import Chat from "../../../entity/Chat";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
        async (payload, _, { connectionContext }) => {
          const logguedUser: User = connectionContext.currentUser;
          const {
            MessageSubscription: { chatId }
          } = payload;
          try {
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return (
                chat.driverId === logguedUser.id ||
                chat.passengerId === logguedUser.id
              );
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      )
    }
  }
};
export default resolvers;
