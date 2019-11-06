import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import connectionOptions from './ormConfig';
import app from './app';

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = '/playground';
const GRPAPHQL_ENDPOINT: string = '/graphql';

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRPAPHQL_ENDPOINT,
};

const handleAppListening = () => console.info(`🔥 Listening on port: ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppListening);
  })
  .catch((err) => console.info(`🤢  oups something going wrong ${err}`));
