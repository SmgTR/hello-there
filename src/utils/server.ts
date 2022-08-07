import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import { usersRouter, swRouter } from '@/routes';
import { strategy } from '@/auth/passport';

function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(passport.initialize());

  passport.use(strategy);

  app.use('/api/v1', usersRouter);
  app.use('/api/v1/starwars', swRouter);

  return app;
}

export default createServer;
