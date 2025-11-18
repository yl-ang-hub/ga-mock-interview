import pool from "../db/db";

export interface ShoeType {
  type_id: number;
  type: string;
}

export const getAllShoeTypes = async (): Promise<ShoeType[]> => {
  const { rows } = await pool.query("SELECT * FROM types ORDER BY type");
  return rows;
};

export const findByName = async (
  name: string
): Promise<ShoeType | undefined> => {
  const { rows } = await pool.query("SELECT * FROM types WHERE type=$1", [
    name,
  ]);
  return rows[0];
};

export const findById = async (id: number): Promise<ShoeType | undefined> => {
  const { rows } = await pool.query("SELECT * FROM types WHERE type_id=$1", [
    id,
  ]);
  return rows[0];
};

export const addOneShoeType = async (type: string): Promise<void> => {
  await pool.query("INSERT INTO types (type) VALUES ($1)", [type]);
};

export const updateOneShoeType = async (
  type: string,
  id: number
): Promise<void> => {
  await pool.query("UPDATE types SET type=($1) WHERE type_id=($2)", [type, id]);
};

export const deleteOneShoeType = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM types WHERE type_id=($1)", [id]);
};
