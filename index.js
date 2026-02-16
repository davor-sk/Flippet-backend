import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let db = connectToDatabase();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Radi!" });
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
