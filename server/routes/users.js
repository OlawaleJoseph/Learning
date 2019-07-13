import express from 'express';
import User from '../controlllers/users';
import { validateSignUp, validateLogin, validateParam } from '../middlewares/inputValidation';
import { validateToken } from '../middlewares/userValidation';

const router = express.Router();


router.post('/signup', [validateSignUp], User.create);
router.post('/signin', [validateLogin], User.login);
router.get('/users/:userId', [validateParam, validateToken], User.findUser);


export default router;
