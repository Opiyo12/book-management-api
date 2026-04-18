//app.js set up express application
//and attaches middleware and routes
import express from "express";
import cors from "cors";
import bookRouter from "./src/routes/book.route.js";
import authRouter from "./src/routes/authRoutes.js";
import { globalErrorHandler } from "./src/middleware/globalErrorHandler.js";
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use('/api/books',bookRouter);
app.use('/api/auth', authRouter);
app.use(globalErrorHandler);


export default app;

