import query from './query';
import Trip from './trips.helperFunctions';
import Bus from './bus';
import { verifyUser } from './a';


class Booking {
  static async createBooking(data, userId) {
    const { trip_id, seat_number } = data;
    try {
      const tripToBook = await Trip.findTrip(trip_id);
      const pickedSeat = await Bus.pickSeat(tripToBook.bus_id, seat_number);
      const createBookingQuery = 'INSERT INTO bookings(trip_id, user_id, seat_number) VALUES($1, $2, $3) returning *';
      const newBooking = await query(createBookingQuery, [
        trip_id,
        userId,
        pickedSeat,
      ]);
      return newBooking[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findABooking(id) {
    const findBookingQuery = `SELECT * FROM bookings 
        INNER JOIN users ON bookings.user_id = users.user_id 
        INNER JOIN trips ON trips.trip_id=bookings.trip_id 
        WHERE bookings.booking_id=$1`;
    try {
      const [{ ...foundBooking }] = await query(findBookingQuery, [id]);
      if (Object.keys(foundBooking).length > 0) {
        const {
          email, user_id, bus_id, trip_date, first_name, last_name, seat_number, trip_id, fare,
        } = foundBooking;
        const booking = {
          booking_id: id,
          user_id,
          trip_id,
          bus_id,
          trip_date,
          seat_number,
          fare,
          first_name,
          last_name,
          email,
        };
        return booking;
      }
      throw new Error('Booking not found');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findAllBookings(user) {
    const findAllBookingsQuery = `SELECT * FROM bookings
        INNER JOIN users ON bookings.user_id = users.user_id 
        INNER JOIN trips ON trips.trip_id=bookings.trip_id`;

    try {
      const allBookings = await query(findAllBookingsQuery);
      if (!user.isAdmin) {
        return allBookings.filter(booking => booking.user_id === user.userId);
      }
      return allBookings;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  static async deleteBooking(id, user) {
    try {
      const bookingToDelete = await Booking.findABooking(id);
      if (!bookingToDelete.booking_id) { return false; }
      verifyUser(user, bookingToDelete.user_id);
      const deleteBookingQuery = 'DELETE FROM bookings WHERE booking_id=$1';
      await query(deleteBookingQuery, [id]);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async changeSeat(busId, oldSeat, newSeat, bookingId) {
    try {
      const updatedBookingSeat = await Bus.changeBusSeat(
        busId,
        newSeat,
        oldSeat,
      );
      const updateSeatQuery = 'UPDATE bookings SET seat_number=$1 WHERE booking_id=$2 returning *';
      return await query(updateSeatQuery, [updatedBookingSeat, bookingId]);
    } catch (error) {
      throw error;
    }
  }
}

export default Booking;
