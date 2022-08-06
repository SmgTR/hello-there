import { registerUser, logInUser } from '@/controllers/userController';
import { userValidationRules, validate } from '@/utils/validator';

import { Router } from 'express';

const router = Router();

router.post('/register', userValidationRules(), validate, registerUser);

router.post('/login', logInUser);

export default router;
