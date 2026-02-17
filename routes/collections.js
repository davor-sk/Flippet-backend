import express from "express";
import { connectToDatabase } from "../utils/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    let collections = await db.collection("collections").find().toArray();
    if (!collections || collections.length == 0) {
      console.log("Nema kolekcija u bazi!");
      return res.status(400).json({ message: "Nema kolekcija u bazi!" });
    }
    return res.status(200).json(collections);
  } catch (error) {
    console.error("Greška na serveru", error);
    return res.status(500).json({ message: "Greška na serveru!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const db = await connectToDatabase();
    const collection = await db
      .collection("collections")
      .findOne({ _id: new ObjectId(user_id) });
    if (!collection) {
      return res.status(400).json({ message: "Tražena kolekcija ne postoji" });
    }
    return res.status(200).json(collection);
  } catch (error) {
    console.error("Greška na serveru", error);
    return res.status(500).json({ message: "Greška na serveru!" });
  }
});

export default router;
