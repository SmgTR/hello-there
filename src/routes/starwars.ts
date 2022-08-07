import { Router } from 'express';
import passport from 'passport';

import { getAllCharacters, getFilteredCharacters } from '@/controllers/swController';

const router = Router();

router.get('/getall', getAllCharacters);

router.get('/getfiltered', passport.authenticate('jwt', { session: false }), getFilteredCharacters);

export default router;
