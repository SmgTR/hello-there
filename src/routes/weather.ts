import { Router } from 'express';
import passport from 'passport';

import { getWeather } from '@/controllers/weatherController';

const router = Router();

router.get('/weather', passport.authenticate('jwt', { session: false }), getWeather);

export default router;
