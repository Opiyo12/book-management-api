
import express from "express";
import cors from "cors";
import bookRouter from "./src/routes/book.route.js";
import { globalErrorHandler } from "./src/middleware/globalErrorHandler.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/books',bookRouter);
app.use(globalErrorHandler);


export default app;

