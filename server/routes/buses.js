import express from 'express';
import Bus from '../controlllers/buses';
import { validateBus, validateParam } from '../middlewares/inputValidation';
import { validateToken, checkAdmin } from '../middlewares/userValidation';


const router = express.Router();

router.post('/', [validateToken, checkAdmin, validateBus], Bus.createBus);
router.get('/', [validateToken, checkAdmin], Bus.findAllBuses);
router.get('/:id', [validateParam, validateToken, checkAdmin], Bus.findABus);

export default router;
