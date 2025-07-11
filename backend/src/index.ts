import { initServer } from "./app";

import * as dotenv from "dotenv";
import { connectDB } from "./db/dbConnection";

dotenv.config();

const DB_URI = process.env.DATABASE_URL!
connectDB(DB_URI)

async function init() {
  const app = await initServer();
  app.listen(8000, () => {
    console.log("Server is on 8000");
  });
}

init();
