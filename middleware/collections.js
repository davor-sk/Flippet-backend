import { validationResult } from "express-validator";
import { connectToDatabase } from "../utils/db.js";
import { verifyJWT } from "../auth.js";

export const handleCollectionValidation = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  return res.status(400).json({ errors: errors.array() });
};

export const findUser = async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    let user = await db.collection("users").findOne({ email: req.body.email });
    if (user) {
      req.user = user;
      return next();
    }
    return next();
  } catch (error) {
    console.error("Greška na serveru", error);
    return res.status(500).json({ message: "Greška na serveru!" });
  }
};

export const autorizacijaKorisnika = (req, res, next) => {
  let token = req.headers.authorization;
  let jwt_token = token.split(" ")[1];
  let decoded = verifyJWT(jwt_token);
  if (decoded) {
    req.decoded = decoded;
    return next();
  }
  return res.status(401).json({
    message: "Molimo da se prijavite kako bi pristupili ovom resursu!",
  });
};
