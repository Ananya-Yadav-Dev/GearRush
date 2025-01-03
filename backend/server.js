import path from 'path';
import express from "express";
import dotenv from "dotenv";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import morgan from 'morgan';
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json());

import cors from "cors";

app.use(cors({origin: "*"}));

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('build/index.html'));
})

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
