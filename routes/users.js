import express from "express";
import { connectToDatabase } from "../utils/db.js";
import { check_password, hash_password } from "../auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();
    let user = await db.collection("users").findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Korisnik ne postoji!" });
    }
    let lozinka_ispravna = await check_password(password, user.password);
    if (!lozinka_ispravna) {
      return res.status(401).json({ message: "Neuspješna autentifikacija" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Greška na serveru", error);
    return res.status(500).json({ message: "Greška na serveru!" });
  }
});

router.post("/register", async (req, res) => {
  const korisnik = req.body;
  try {
    let hashed_password = await hash_password(korisnik.password);
    let novi_korisnik = {
      ...korisnik,
      password: hashed_password,
      registeredAt: new Date(),
    };
    const db = await connectToDatabase();
    let provjera_usera = await db
      .collection("users")
      .findOne({ email: korisnik.email });
    if (provjera_usera) {
      return res
        .status(400)
        .json({ message: "Korisnik s tom email adresom već postoji!" });
    }
    let result = await db.collection("users").insertOne(novi_korisnik);
    if (result.acknowledged) {
      return res.status(201).json({
        message: `Korisnik ${novi_korisnik.username} uspješno dodan u bazu!`,
      });
    }
  } catch (error) {
    console.error("Greška na serveru", error);
    return res.status(500).json({ message: "Greška na serveru!" });
  }
});

export default router;
