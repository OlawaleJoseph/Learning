import helperFunction from '../helperFunctions/bus';

class Bus {
  static async createBus(req, res) {
    try {
      const registeredBus = await helperFunction.findBusByPlate(req.body.number_plate);
      if (!registeredBus) {
        try {
          const newBus = await helperFunction.createBus(req.body);
          const { seats, ...newBusObj } = newBus;
          return res.status(201).json({
            status: 'success',
            data: newBusObj,
          });
        } catch (error) {
          return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
          });
        }
      } else {
        return res.status(409).json({
          status: 'error',
          message: 'Bus already registered',
        });
      }
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async findAllBuses(req, res) {
    try {
      const buses = await helperFunction.findAllBuses();
      const allBuses = buses.map((bus) => {
        const { seats, ...busObj } = bus;
        return busObj;
      });
      return res.status(200).json({
        status: 'success',
        data: allBuses,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server Error',
      });
    }
  }

  static async findABus(req, res) {
    try {
      const bus = await helperFunction.findBusById(req.params.id);

      const { seats, ...busObj } = bus;
      return res.status(200).json({
        status: 'success',
        data: busObj,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async deleteBus(req, res) {
    try {
      await helperFunction.deleteBus(req.params.id);
      res.status(204).json({
        status: 'success',
        data: [],
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default Bus;
