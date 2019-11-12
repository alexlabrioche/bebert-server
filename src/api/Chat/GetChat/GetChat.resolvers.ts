import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";
import { GetChatResponse, GetChatQueryArgs } from "../../../types/graph";
import Chat from "../../../entity/Chat";

const resolvers: Resolvers = {
  Query: {
    GetChat: authResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const logguedUser = req.user;
        try {
          const chat = await Chat.findOne({ id: args.chatId });

          if (chat) {
            if (
              chat.passengerId === logguedUser.id ||
              chat.driverId === logguedUser.id
            ) {
              return {
                ok: true,
                error: null,
                chat
              };
            } else {
              return {
                ok: false,
                error: "Non autorisé",
                chat: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Chat non trouvé",
              chat: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null
          };
        }
      }
    )
  }
};
export default resolvers;
