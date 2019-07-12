import express from 'express';
import Booking from '../controlllers/bookings';
import { validateParam, validateBooking } from '../middlewares/inputValidation';
import { validateToken } from '../middlewares/userValidation';

const router = express();


router.post('/', [validateToken, validateBooking], Booking.createBooking);
router.get('/:id', [validateParam, validateToken], Booking.findABooking);
router.get('/', validateToken, Booking.findAllBookings);
router.patch('/:id', [validateParam, validateToken], Booking.updateSeat);
router.delete('/:id', [validateToken], Booking.deleteBooking);

export default router;
