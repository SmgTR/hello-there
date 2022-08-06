import express from 'express';

import bodyParser from 'body-parser';
import { usersRouter } from '@/routes';

function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api/v1', usersRouter);

  return app;
}

export default createServer;
