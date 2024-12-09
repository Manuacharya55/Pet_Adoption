import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();

import AuthRouter from "./Routers/Auth.router.js";
import PetRouter from "./Routers/Pet.router.js";
import ShopRouter from "./Routers/Shop.router.js";
import AdoptionRouter from "./Routers/Adoption.router.js";
import connectDB from "./Database/index.js";

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Sever started at port", PORT);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/pet", PetRouter);
app.use("/api/v1/shop", ShopRouter);
app.use("/api/v1/adoption", AdoptionRouter);
