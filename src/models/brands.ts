import pool from "../db/db";

export interface BrandType {
  brand_id: number;
  brand: string;
}

export const getAllBrands = async (): Promise<BrandType[]> => {
  const { rows } = await pool.query("SELECT * FROM brands ORDER BY brand");

  return rows;
};

export const findByName = async (
  brand: string
): Promise<BrandType | undefined> => {
  const { rows } = await pool.query("SELECT * FROM brands WHERE brand=($1)", [
    brand,
  ]);

  return rows[0]; // each row is brandType object; undefined if not found
};

export const findById = async (id: number): Promise<BrandType | undefined> => {
  const { rows } = await pool.query(
    "SELECT * FROM brands WHERE brand_id=($1)",
    [id]
  );

  return rows[0]; // each row is brandType object; undefined if not found
};

export const addOneBrand = async (brand: string): Promise<void> => {
  await pool.query("INSERT INTO brands (brand) VALUES ($1)", [brand]);
};

export const updateOneBrand = async (
  brand: string,
  id: number
): Promise<void> => {
  await pool.query("UPDATE brands SET brand=($1) WHERE brand_id=($2)", [
    brand,
    id,
  ]);
};

export const deleteOneBrand = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM brands WHERE brand_id=($1)", [id]);
};
