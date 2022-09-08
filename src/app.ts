import dotenv from 'dotenv';
dotenv.config({path: `${__dirname}/../.env`});

import express from 'express';
import routerRoot from './routes/root.route';
import config from './configurations';

// setup api clients
import {logger} from './utilities/logger';
import {Server} from 'http';
import helmet from 'helmet';
// import cors from 'cors';
import {destroyClients, setupClients} from './clients';

/**
 * Prepare the Express HTTP server
 * @returns A promise to Server which resolves once it starts listening.
 */
export async function launchServer(): Promise<Server> {
  logger.log('===== CONFIGURATION =====\n', config);
  // logger.log('======= CONSTANTS =======\n', constants);

  const app = express();

  // setup middlewares
  // app.use(cors()); // @TODO add cors options for allowed origins
  app.use(helmet());
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  // setup routers
  app.use(routerRoot);

  const setupSuccess = await setupClients();

  // listen
  return await new Promise((resolve, reject) => {
    if (setupSuccess) {
      // healthchecks pass, start listening
      const server = app.listen(config.Server.Port, () => {
        logger.log('========= LIVE! =========');
        logger.log('Listening on port:', config.Server.Port);
        resolve(server);
      });
    } else {
      reject('Healthchecks failed!');
    }
  });
}

/**
 * Kills the server gracefully. Optionally exits the process, which you should NOT if you are testing.
 * @param server the HTTP server to close
 * @param exitProcess do process.exit after closing?
 */
export async function killServer(server: Server, exitProcess = false) {
  logger.log('\n\nKilling server.');

  await destroyClients();

  server.close(err => {
    if (err) {
      logger.log('Error during termination.', err);
      // eslint-disable-next-line no-process-exit
      exitProcess && process.exit(1);
    } else {
      logger.log('Gracefully terminated. 💐');
      // eslint-disable-next-line no-process-exit
      exitProcess && process.exit(0);
    }
  });
}

if (require.main === module) {
  launchServer()
    .then(server => {
      // signal listeners
      process.on('SIGTERM', () => killServer(server, true));
      process.on('SIGINT', () => killServer(server, true));
    })
    .catch(err => {
      logger.log('Could not launch server:', err);
      // eslint-disable-next-line no-process-exit
      destroyClients().then(() => process.exit(1));
    });
}
