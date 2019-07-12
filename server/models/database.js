/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.NODE_ENV === 'development' ? process.env.devDb : process.env.dbUrl;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to db');
});
