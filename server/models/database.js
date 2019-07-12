import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.NODE_ENV === 'development' ? process.env.devDb : process.env.dbUrl;

export const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log('Connected to db');
});
