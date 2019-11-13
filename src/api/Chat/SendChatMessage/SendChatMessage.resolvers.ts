import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";
import {
  SendChatMessageResponse,
  SendChatMessageMutationArgs
} from "../../../types/graph";
import User from "../../../entity/User";
import Message from "../../../entity/Message";
import Chat from "../../../entity/Chat";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: authResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const logguedUser: User = req.user;
        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            if (
              chat.passengerId === logguedUser.id ||
              chat.driverId === logguedUser.id
            ) {
              const message = await Message.create({
                text: args.text,
                chat,
                user: logguedUser
              }).save();
              pubSub.publish("newChatMessage", {
                MessageSubscription: message
              });
              return {
                ok: true,
                error: null,
                message
              };
            } else {
              return {
                ok: false,
                error: "Non autorisé",
                message: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Chat non trouvé",
              message: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            message: null
          };
        }
      }
    )
  }
};
export default resolvers;
