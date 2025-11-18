import { Pool } from "pg";

const pool: Pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE,
  max: 10,
});

export const connectDB = async (): Promise<void> => {
  try {
    const response = await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected:", response.rows[0]["now"]);
  } catch (e: any) {
    console.log("Error connecting to database: ", e.message);
    process.exit(1);
  }
};

export default pool;
