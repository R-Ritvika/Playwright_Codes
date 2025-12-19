import sql, { IResult } from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

// Database configuration interface
interface DBConfig {
  user: string;
  password: string;
  database: string;
  server: string;
  port: number;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

const config: DBConfig = {
  user: String(process.env.DB_USER),
  password: String(process.env.DB_PASS),
  database: String(process.env.DB_NAME),
  server: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Get asset count from database
export async function getAssetCount(): Promise<number> {
  try {
    const pool = await sql.connect(config);
    const result: IResult<{ count: number }> = await pool
      .request()
      .query('SELECT COUNT(Id) AS count FROM Asset;');
    return result.recordset[0].count;
  } catch (err) {
    console.error('Database Error:', err);
    throw err;
  }
}

