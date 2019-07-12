import { pool } from '../models/database';

const query = async (text, data) => {
  try {
    const { rows } = await pool.query(text, data);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};


export default query;
