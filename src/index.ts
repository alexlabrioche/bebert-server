import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import connectionOptions from './ormConfig';
import app from './app';
import decodeJWT from './utils/decodeJWT';

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = '/playground';
const GRAPHL_ENDPOINT: string = '/graphql';
const GRAPHQL_SUBSCRIBE_ENDPOINT: string = '/subscription';

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHL_ENDPOINT,
  subscriptions: {
    path: GRAPHQL_SUBSCRIBE_ENDPOINT,
    onConnect: async (connectionParams) => {
      try {
        const token = connectionParams['X-JWT'];
        if (token) {
          const currentUser = await decodeJWT(token);
          if (currentUser) {
            return {
              currentUser,
            };
          }
        }
        throw new Error(`Problème avec le token JWT.`);
      } catch (error) {
        throw new Error(`${error.message}`);
      }
    },
  },
};

const handleAppListening = () => console.info(`🔥 Listening on port: ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppListening);
  })
  .catch((err) => console.info(`🤢 oups something going wrong ${err}`));
