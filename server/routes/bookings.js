import express from 'express';
import Booking from '../controlllers/bookings';
import { validateParam, validateBooking } from '../middlewares/inputValidation';
import { validateToken } from '../middlewares/userValidation';

const router = express();


router.post('/', [validateToken, validateBooking], Booking.createBooking);
router.get('/:bookingId', [validateParam, validateToken], Booking.findABooking);
router.get('/', validateToken, Booking.findAllBookings);
router.patch('/:bookingId', [validateParam, validateToken], Booking.updateSeat);
router.delete('/:bookingId', [validateToken], Booking.deleteBooking);

export default router;
