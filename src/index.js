import conntectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

conntectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(error);
      throw error;
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server  is running on ${process.env.PORT}`);
    });
  })

  .catch((err) => {
    console.log("MONGO connetion failed", err);
  });

app.get("/", (req, res) => {
  res.send("app is running");
});

app.post("/login", (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});

// const app = express()

