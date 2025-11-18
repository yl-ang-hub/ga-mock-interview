import pool from "../db/db";

export interface InventoryType {
  shoes_id: number;
  colour: string;
  size: number;
  quantity: number;
  created_at: Date;
  updated_at: Date | null;
}

export const getAllInventory = async (): Promise<InventoryType[]> => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory 
      JOIN shoes ON inventory.shoes_id = shoes.id 
      JOIN types ON types.type_id = shoes.type_id 
      JOIN brands on brands.brand_id = shoes.brand_id`
  );

  return rows;
};

export const findByAllParams = async (
  shoes_id: number,
  colour: string,
  size: number
): Promise<InventoryType | undefined> => {
  const { rows } = await pool.query(
    "SELECT * FROM inventory WHERE shoes_id=$1 AND colour=$2 AND size=$3",
    [shoes_id, colour, size]
  );

  return rows[0];
};

export const findByShoesId = async (
  shoes_id: number
): Promise<InventoryType[]> => {
  const { rows } = await pool.query(
    "SELECT * FROM inventory WHERE shoes_id=$1",
    [shoes_id]
  );
  return rows;
};

export const addItem = async (
  shoes_id: number,
  colour: string,
  size: number,
  quantity: number
): Promise<void> => {
  await pool.query(
    `INSERT INTO inventory (shoes_id, colour, size, quantity) VALUES ($1, $2, $3, $4)`,
    [shoes_id, colour, size, quantity]
  );
};

export const deleteItem = async (
  shoes_id: number,
  colour: string,
  size: number
): Promise<void> => {
  await pool.query(
    `DELETE FROM inventory WHERE shoes_id=$1 AND colour=$2 AND size=$3`,
    [shoes_id, colour, size]
  );
};

export const updateQuantity = async (
  shoes_id: number,
  colour: string,
  size: number,
  quantity: number
): Promise<InventoryType> => {
  const { rows } = await pool.query(
    "UPDATE inventory SET quantity=$4, updated_at=NOW() WHERE shoes_id=$1 AND colour=$2 AND size=$3 RETURNING *",
    [shoes_id, colour, size, quantity]
  );
  return rows[0];
};
