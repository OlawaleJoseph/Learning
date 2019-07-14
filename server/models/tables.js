import { pool } from './database';

export const createUsersTable = async () => {
  const userQueryText = `CREATE TABLE IF NOT EXISTS 
    users(
        user_id          SERIAL PRIMARY KEY,
        first_name  VARCHAR(120) NOT NULL,
        last_name   VARCHAR(120) NOT NULL,
        email       VARCHAR(120) NOT NULL UNIQUE,
        password    VARCHAR(120) NOT NULL,
        is_admin   BOOLEAN NOT NULL,
        date_registered  TIMESTAMP DEFAULT NOW()
    )`;
  try {
    await pool.query(userQueryText);
  } catch (error) {
    console.log(error);
  }
};

export const createBusesTable = async () => {
  const busTableQuery = `CREATE TABLE IF NOT EXISTS buses(
        bus_id SERIAL  PRIMARY KEY,
        number_plate  VARCHAR(9) NOT NULL,
        manufacturer   TEXT NOT NULL,
        model     VARCHAR NOT NULL,
        year   TEXT NOT NULL,
        capacity  INT NOT NULL,
        seats     INT[] NOT NULL,
        available  BOOLEAN
    )`;
  try {
    await pool.query(busTableQuery);
  } catch (error) {
    console.log(error);
  }
};

export const createTripsTable = async () => {
  const tripTableQuery = `CREATE TABLE IF NOT EXISTS trips(
        trip_id SERIAL  PRIMARY KEY,
        bus_id  INT REFERENCES buses(bus_id) ON DELETE CASCADE NOT NULL,
        origin   TEXT NOT NULL,
        destination     TEXT NOT NULL,
        fare   FLOAT NOT NULL,
        trip_date  TIMESTAMP NOT NULL,
        status text NOT NULL,
        trip_completed BOOLEAN NOT NULL
    )`;
  try {
    await pool.query(tripTableQuery);
  } catch (error) {
    console.log(error);
  }
};

export const createBookingsTable = async () => {
  const bookingTableQuery = `CREATE TABLE IF NOT EXISTS bookings(
        booking_id      SERIAL PRIMARY KEY,
        trip_id  INT REFERENCES trips(trip_id) ON DELETE CASCADE NOT NULL,
        user_id    INT REFERENCES users(user_id)ON DELETE CASCADE NOT NULL,
        seat_number INT NOT NULL,
        created_on  TIMESTAMP DEFAULT NOW()
    )`;
  try {
    await pool.query(bookingTableQuery);
  } catch (error) {
    console.log(error);
  }
};

export const createTables = async () => {
  try {
    await createUsersTable();
    await createBusesTable();
    await createTripsTable();
    await createBookingsTable();
  } catch (error) {
    throw new Error(error.message);
  } finally {
    pool.end();
  }
};
export const dropTables = async () => {
  const dropTablesQuery = 'DROP TABLE IF EXISTS users, buses, trips, bookings CASCADE';

  try {
    await pool.query(dropTablesQuery);
    console.log('Tables Dropped');
  } catch (error) {
    console.log(error);
  } finally {
    pool.end();
  }
};

require('make-runnable');
