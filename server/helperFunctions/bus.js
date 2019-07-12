/* eslint-disable no-param-reassign */
import query from './query';


class Bus {
  static async createBus(data) {
    const queryText = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity, seats, available) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
    const {
      number_plate, manufacturer, model, year, capacity,
    } = data;
    const seatsNumberArray = Bus.generateSeats(capacity);
    try {
      const newBus = await query(queryText, [
        number_plate.toUpperCase(),
        manufacturer,
        model,
        year,
        capacity,
        seatsNumberArray,
        true,
      ]);
      return newBus[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findBusById(id) {
    const findBusByIdQuery = 'SELECT * FROM buses WHERE bus_id = $1';
    try {
      const foundBus = await query(findBusByIdQuery, [id]);
      if (!foundBus[0]) { throw new Error('Bus not found'); }
      return foundBus[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findBusByPlate(plate) {
    const findBusQuery = 'SELECT * FROM buses WHERE number_plate = $1';
    try {
      const foundBus = await query(findBusQuery, [plate.toUpperCase()]);
      return foundBus[0];
    } catch (error) {
      throw new Error('No Bus found');
    }
  }


  static async findAllBuses() {
    const findAllBusesQuery = 'SELECT * FROM buses';
    try {
      const buses = await query(findAllBusesQuery);
      return buses;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static generateSeats(busCapacity) {
    const seats = [];
    while (busCapacity) {
      seats.push(busCapacity);
      // eslint-disable-next-line no-plusplus
      busCapacity--;
    }
    return seats;
  }

  static async pickSeat(bus_id, seatNumber) {
    const updateQuery = 'UPDATE buses SET seats=$1 WHERE bus_id=$2 returning *';
    let index;
    try {
      const boardingBus = await Bus.findBusById(bus_id);
      if (boardingBus.seats.length < 1) {
        throw new Error('All seats are filled');
      }
      if (seatNumber) {
        seatNumber = parseInt(seatNumber, 10);
        if (!boardingBus.seats.includes(seatNumber)) {
          throw new Error('Seat not available. Choose another seat');
        } else {
          index = boardingBus.seats.indexOf(seatNumber);
          boardingBus.seats.splice(index, 1);
        }
      } else {
        index = Math.floor(Math.random() * boardingBus.seats.length);
        seatNumber = boardingBus.seats[index];
        boardingBus.seats.splice(index, 1);
      }
      await query(updateQuery, [boardingBus.seats, bus_id]);
      return seatNumber;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateBusAvailability(id) {
    try {
      const busToUpdate = await Bus.findBusById(id);
      if (!busToUpdate) {
        throw new Error('Bus not found');
      } else {
        const busSeats = this.generateSeats(busToUpdate.capacity);
        const updateBusQuery = 'UPDATE buses SET available=$1, seats=$2 WHERE bus_id=$3 returning *';
        try {
          const updatedBus = await query(updateBusQuery, [
            !busToUpdate.available,
            busSeats,
            id,
          ]);
          return updatedBus;
        } catch (error) {
          throw new Error('Could not update Bus');
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async changeBusSeat(id, newSeat, OldSeat) {
    try {
      const currentSeat = await Bus.pickSeat(id, newSeat);
      const busToUpdateSeat = await Bus.findBusById(id);
      const newSeats = busToUpdateSeat.seats.slice();
      newSeats.push(OldSeat);
      const updateSeatQuery = 'UPDATE buses SET seats=$2 WHERE bus_id=$1';
      await query(updateSeatQuery, [id, newSeats]);
      return currentSeat;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBus(busId) {
    const busToDelete = Bus.findBusById(busId);
    if (busToDelete) {
      try {
        const deleteBusQuery = 'DELETE FROM buses WHERE bus_id=$1';
        await query(deleteBusQuery, [busId]);
        return true;
      } catch (error) {
        throw error;
      }
    }
    return null;
  }
}

export default Bus;
