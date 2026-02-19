import express from "express";
import { connectToDatabase } from "../utils/db.js";
import { check_password, generateJWT, hash_password } from "../auth.js";
import { findUser } from "../middleware/users.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/user_validator.js";

const router = express.Router();

router.post("/register", [validateRegister, findUser], async (req, res) => {
  const korisnik = req.body;
  try {
    let hashed_password = await hash_password(korisnik.password);
    let novi_korisnik = {
      username: korisnik.username,
      email: korisnik.email,
      first_name: korisnik.first_name,
      last_name: korisnik.last_name,
      password: hashed_password,
      registeredAt: new Date(),
    };
    if (req.user) {
      return res
        .status(400)
        .json({ message: "Korisnik s tom email adresom već postoji!" });
    }
    const db = await connectToDatabase();
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

router.post("/login", [validateLogin, findUser], async (req, res) => {
  const password = req.body.password;

  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Greška! Neuspješna autentifikacija!" });
    }
    let lozinka_ispravna = await check_password(password, req.user.password);
    if (!lozinka_ispravna) {
      return res
        .status(401)
        .json({ message: "Greška! Neuspješna autentifikacija!" });
    } else {
      let jwt_payload = {
        id: req.user._id,
        email: req.user.email,
      };
      let jwt_token = await generateJWT(jwt_payload);
      return res.status(200).json({ user: jwt_payload, jwt_token: jwt_token });
    }
  } catch (error) {
    console.error("Greška na serveru", error);
    return res.status(500).json({ message: "Greška na serveru!" });
  }
});

export default router;
