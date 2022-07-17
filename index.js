import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

//connect db

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use("/api", routes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on Port ${PORT}`);
});
