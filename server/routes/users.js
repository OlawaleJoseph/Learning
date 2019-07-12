import express from 'express';
import User from '../controlllers/users';
import { validateSignUp, validateLogin, validateParam } from '../middlewares/inputValidation';
import { validateToken } from '../middlewares/userValidation';

const router = express.Router();


router.post('/signup', [validateSignUp], User.create);
router.post('/login', [validateLogin], User.login);
router.get('/users/:id', [validateParam, validateToken], User.findUser);


export default router;
