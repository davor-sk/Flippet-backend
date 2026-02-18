import bcrypt from "bcrypt";

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
