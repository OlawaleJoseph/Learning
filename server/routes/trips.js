import express from 'express';
import Trip from '../controlllers/trips';
import { validateParam, validateQuery, validateTrip } from '../middlewares/inputValidation';
import { validateToken, checkAdmin } from '../middlewares/userValidation';


const router = express.Router();

router.post('/', [validateTrip, validateToken, checkAdmin], Trip.createTrip);
router.get('/', [validateQuery, validateToken], Trip.findAllTrips);
router.get('/:tripId', [validateParam, validateToken], Trip.findATrip);
router.patch('/:tripId', [validateParam, validateToken, checkAdmin], Trip.updateTripStatus);

export default router;
