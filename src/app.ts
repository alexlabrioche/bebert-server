import { GraphQLServer, PubSub } from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction, Response } from "express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    // set Real time with GraphQL Yoga, for production use another library more robust than this
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: req => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          connectionContext: context
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.checkJWT);
    this.app.express.use(
      "/voyager",
      voyagerMiddleware({ endpointUrl: "/graphql" })
    );
  };

  private checkJWT = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}
export default new App().app;
