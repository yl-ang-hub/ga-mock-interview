import pool from "../db/db";

export interface ShoesType {
  id: number;
  type_id: number;
  brand_id: number;
  model: string;
  created_at: Date;
  updated_at: Date | null;
  type: string;
  brand: string;
}

export const getAllShoes = async (): Promise<ShoesType[]> => {
  const { rows } = await pool.query(
    "SELECT * FROM shoes JOIN types ON types.type_id = shoes.TYPE_ID JOIN brands ON brands.brand_id = shoes.BRAND_ID ORDER BY brands.brand, types.TYPE, shoes.model"
  );
  return rows;
};

export const findById = async (id: number): Promise<ShoesType | undefined> => {
  const { rows } = await pool.query(
    "SELECT * FROM shoes JOIN types ON types.type_id = shoes.TYPE_ID JOIN brands ON brands.brand_id = shoes.BRAND_ID WHERE shoes.id=$1",
    [id]
  );
  return rows[0];
};

export const findByAllParams = async (
  type: string,
  brand: string,
  model: string
): Promise<ShoesType | undefined> => {
  const { rows } = await pool.query(
    "SELECT * FROM shoes JOIN types ON shoes.TYPE_ID = types.type_id JOIN brands ON shoes.BRAND_ID = brands.brand_id WHERE types.type=$1 AND brands.brand=$2 AND shoes.model=$3",
    [type, brand, model]
  );

  return rows[0];
};

export const findByBrandId = async (id: number): Promise<ShoesType[]> => {
  const { rows } = await pool.query(
    "SELECT * FROM shoes JOIN types ON types.type_id = shoes.TYPE_ID JOIN brands ON brands.brand_id = shoes.BRAND_ID WHERE shoes.brand_id=$1",
    [id]
  );
  return rows;
};

export const addShoes = async (
  type_id: number,
  brand_id: number,
  model: string
): Promise<void> => {
  await pool.query(
    "INSERT INTO shoes (TYPE_ID, BRAND_ID, model) VALUES ($1, $2, $3)",
    [type_id, brand_id, model]
  );
};

export const updateShoes = async (
  id: number,
  type_id: number,
  brand_id: number,
  model: string
): Promise<ShoesType> => {
  const { rows } = await pool.query(
    `WITH updated AS (
      UPDATE shoes 
      SET type_id=$1, brand_id=$2, model=$3, updated_at=NOW() 
      WHERE id=$4 
      RETURNING *
    ) 
    SELECT * FROM updated
      JOIN types ON types.type_id = updated.type_id
      JOIN brands ON brands.brand_id = updated.brand_id`,
    [type_id, brand_id, model, id]
  );

  return rows[0];
};

export const deleteShoes = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM shoes WHERE id=$1", [id]);
};
