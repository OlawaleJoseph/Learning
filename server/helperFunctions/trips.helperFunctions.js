import query from './query';
import Bus from './bus';


class TripHelperFunctions {
  static async createTrip(body) {
    let bus_id; let origin; let destination; let trip_date; let
      fare;
    if (Object.keys(body).length > 0) {
      ({
        origin, destination, trip_date, fare, bus_id,
      } = body);
    } else {
      bus_id = await TripHelperFunctions.pickBus();
      const trip = TripHelperFunctions.generateTrip();
      ({
        origin, destination, trip_date, fare,
      } = trip);
    }
    try {
      const bus = await Bus.findBusById(bus_id);
      if (!bus.available) { throw new Error('The bus with the given Id is on another trip'); }
      const newTripQuery = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare, status, trip_completed) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
      const createdTrip = await query(newTripQuery, [
        bus_id,
        origin.toUpperCase(),
        destination.toUpperCase(),
        trip_date,
        fare,
        'active',
        false,
      ]);
      await Bus.updateBusAvailability(bus_id);
      const { trip_completed, ...trip } = createdTrip[0];
      return trip;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findTrip(id) {
    const findOneTripQuery = 'SELECT * FROM trips WHERE trip_id = $1';
    try {
      const trip = await query(findOneTripQuery, [id]);
      if (!trip[0]) { throw new Error('Trip not Found'); }
      return trip[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAlltrips() {
    const alltripsQuery = 'SELECT * FROM trips';
    try {
      const trips = await query(alltripsQuery);
      return trips.map((trip) => {
        const { trip_completed, status, ...tripObj } = trip;
        return tripObj;
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateTripStatus(id) {
    try {
      const trip = await TripHelperFunctions.findTrip(id);
      if (!trip) {
        throw new Error('Trip not found');
      } else {
        const newStatus = trip.status === 'active' ? 'cancelled' : 'active';
        const updateTripQuery = 'UPDATE trips SET status=$1 WHERE trip_id=$2 returning *';
        try {
          const updatedTrip = await query(updateTripQuery, [newStatus, id]);
          await Bus.updateBusAvailability(updatedTrip[0].bus_id);
          return updatedTrip;
        } catch (error) {
          throw new Error('Could not update trip');
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateTripSuccess(id) {
    const tripToUpdate = TripHelperFunctions.findTrip(id);
    const tripToUpdateQuery = 'UPDATE trips SET trip_completed=$1 WHERE trip_id=$2 returning *';
    try {
      const updatedTrip = await query(tripToUpdateQuery, [
        !tripToUpdate.tripCompleted,
        id,
      ]);
      return updatedTrip;
    } catch (error) {
      throw new Error('Trip not found');
    }
  }

  static filterTrips(params, data) {
    let { origin, destination } = params;
    if (origin && destination) {
      origin = origin.toUpperCase();
      destination = destination.toUpperCase();
      return data.filter(item => item.origin === origin && item.destination === destination);
    } if (origin) {
      origin = origin.toUpperCase();
      return data.filter(item => item.origin === origin);
    }
    destination = destination.toUpperCase();
    return data.filter(item => item.destination === destination);
  }

  static async pickBus() {
    const buses = await Bus.findAllBuses();
    const availableBuses = buses.filter(bus => bus.available);
    if (availableBuses.length < 1) { throw new Error('No available Bus for this trip'); }
    const randomNumber = Math.floor(Math.random() * availableBuses.length);
    const bus = availableBuses[randomNumber];
    return bus.bus_id;
  }

  static generateTrip() {
    const trips = [{
      origin: 'Ketu',
      destination: 'Ikorodu',
      fare: 100,
      trip_date: '20/07/2019 15:00',
    }, {
      origin: 'Ikorodu',
      destination: 'Ketu',
      fare: 100,
      trip_date: '20/07/2019 13:00',
    }, {
      origin: 'Maryland',
      destination: 'CMS',
      fare: 200,
      trip_date: '20/07/2019 10:00',
    }, {
      origin: 'Obalende',
      destination: 'Ajah',
      fare: 250,
      trip_date: '20/07/2019 17:00',
    }, {
      origin: 'Yaba',
      destination: 'Apapa',
      fare: 300,
      trip_date: '20/07/2019 07:00',
    }, {
      origin: 'Iyana-Ipaja',
      destination: 'Ikeja',
      fare: 150,
      trip_date: '20/07/2019 06:00',
    }, {
      origin: 'Fadeyi',
      destination: 'Mile12',
      fare: 100,
      trip_date: '20/07/2019 12:00',
    }, {
      origin: 'Badagry',
      destination: 'Mile2',
      fare: 350,
      trip_date: '20/07/2019 13:30',
    }];
    const tripNumber = Math.floor(Math.random() * trips.length);
    return trips[tripNumber];
  }
}

export default TripHelperFunctions;