import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

export async function hash_password(password, saltRounds = 10) {
  try {
    let hash = await bcrypt.hash(password, saltRounds);
    console.log(`hash za lozinku ${password} je ${hash}`);
    return hash;
  } catch (error) {
    console.error(`Došlo je do greške prilikom hashiranja lozinke: ${err}`);
    return error;
  }
}

export async function check_password(password, hashed_password) {
  try {
    let lozinka_ispravna = await bcrypt.compare(password, hashed_password);
    return lozinka_ispravna;
  } catch (error) {
    console.error("Došlo je do greške: ", error);
    return error;
  }
}

export function generateJWT(payload) {
  try {
    let JWT_secret = process.env.JWT_SECRET;
    if (!JWT_secret) {
      throw new Error("Tajni ključ za potpisivanje JWT tokena nije dostupan.");
    }
    let jwt_token = jwt.sign(payload, JWT_secret);
    return jwt_token;
  } catch (error) {
    console.error("Došlo je do greške u izradi JWT tokena!", error);
    return error;
  }
}

export function verifyJWT(token) {
  try {
    let JWT_secret = process.env.JWT_SECRET;
    if (!JWT_secret) {
      throw new Error("Tajni ključ za potpisivanje JWT tokena nije dostupan.");
    }
    let decoded = jwt.verify(token, JWT_secret);
    return decoded;
  } catch (error) {
    console.error("Neuspješna verifikacija JWT tokena!", error);
    return false;
  }
}
