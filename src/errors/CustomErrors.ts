import { AppError } from "./AppError";

export class IDNotFoundError extends AppError {
  constructor() {
    super("Failed: ID is not found in database", 404);
  }
}

export class DuplicateBrandError extends AppError {
  constructor() {
    super("Failed: Brand already exists in database", 409);
  }
}

export class DuplicateTypeError extends AppError {
  constructor() {
    super("Failed: Type already exists in database", 409);
  }
}

export class DuplicateShoesError extends AppError {
  constructor() {
    super("Failed: Shoes already exists in database", 409);
  }
}

export class MissingTypeError extends AppError {
  constructor() {
    super("Failed: Type not found in database", 404);
  }
}

export class MissingBrandError extends AppError {
  constructor() {
    super("Failed: Brand not found in database", 404);
  }
}

export class DuplicateInventoryError extends AppError {
  constructor() {
    super(
      "Failed: Duplicate entry with the same shoes type, brand, model, colour and size found in inventory",
      409
    );
  }
}

export class InventoryNotFoundError extends AppError {
  constructor() {
    super("Failed: Inventory is not found in database", 404);
  }
}

export class NoDetectedChangeError extends AppError {
  constructor() {
    super(
      "Failed: there is no detected changes between the provided data and the database.",
      400
    );
  }
}

export class ExistingDataInShoesDatabaseError extends AppError {
  constructor() {
    super(
      "Failed: This item cannot be deleted as it is referenced by other records in the shoes database.",
      409
    );
  }
}

export class ExistingDataInInventoryDatabaseError extends AppError {
  constructor() {
    super(
      "Deletion failed: This item cannot be deleted as it is referenced by other records in the inventory database.",
      409
    );
  }
}
