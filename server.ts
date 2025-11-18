import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./src/db/db";
import typesRouter from "./src/routers/types";
import brandsRouter from "./src/routers/brands";
import shoesRouter from "./src/routers/shoes";
import inventoryRouter from "./src/routers/inventory";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app: Application = express();
connectDB();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

interface ExpressError extends Error {
  status?: number;
  type?: string;
}

app.use(
  (
    err: ExpressError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      console.error("JSON parsing error:", err.message);
      return res.status(400).send({ status: 400, msg: "invalid JSON format" });
    } else if (
      err instanceof SyntaxError &&
      err.status === 400 &&
      err.type === "entity.parse.failed"
    ) {
      console.error("URL-encoding parsing error:", err.message);
      return res.status(400).json({
        status: 400,
        msg: "invalid form data format",
      });
    }
    next();
  }
);

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ info: "Node.js, Express, and Postgres API" });
});

app.use("/types", typesRouter);
app.use("/brands", brandsRouter);
app.use("/shoes", shoesRouter);
app.use("/inventory", inventoryRouter);

const PORT = process.env.EXPRESS_PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
