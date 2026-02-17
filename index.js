import express from "express";
import cors from "cors";
import collectionsRouter from "./routes/collections.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/collections", collectionsRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
