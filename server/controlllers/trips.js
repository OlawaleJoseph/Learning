import Trips from '../helperFunctions/trips.helperFunctions';

class Trip {
  static async createTrip(req, res) {
    try {
      const createdTrip = await Trips.createTrip(req.body);
      return res.status(201).json({
        status: 'success',
        data: createdTrip,
      });
    } catch (error) {
      return res.status(422).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async findATrip(req, res) {
    try {
      const { trip_completed, ...foundTrip } = await Trips.findTrip(req.params.id);
      return res.status(200).json({
        status: 'success',
        data: foundTrip,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async findAllTrips(req, res) {
    try {
      let allTrips = await Trips.getAlltrips();
      if (Object.keys(req.query).length > 0 && allTrips.length > 0) {
        allTrips = Trips.filterTrips(req.query, allTrips);
      }
      return res.status(200).json({
        status: 'success',
        data: allTrips,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

  static async updateTripStatus(req, res) {
    try {
      const updatedtrip = await Trips.updateTripStatus(req.params.id);
      return res.status(200).json({
        status: 'success',
        data: updatedtrip,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default Trip;
