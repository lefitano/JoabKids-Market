import express from "express";
import cors from "cors";
import "./config/firebase.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sejam bem vindo ao Joab Kids Market!");
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
