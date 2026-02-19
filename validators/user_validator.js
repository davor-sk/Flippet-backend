import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/users.js";

export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Korisničko ime je obavezno")
    .escape()
    .isLength({ min: 4 })
    .withMessage("Korisničko ime mora sadržavati minimalno 4 znaka"),
  body("email")
    .notEmpty()
    .withMessage("Email adresa je obavezno polje")
    .isEmail()
    .withMessage("Email adresa nije ispravna")
    .normalizeEmail(),
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("Ime je obavezno")
    .isLength({ min: 2 })
    .withMessage("Ime mora sadržavati najmanje 2 znaka"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Prezime je obavezno")
    .isLength({ min: 2 })
    .withMessage("Prezime mora sadržavati najmanje 2 znaka"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Lozinka je obavezna")
    .isLength({ min: 8 })
    .withMessage("Lozinka mora sadržavati najmanje 8 znakova")
    .matches(/[A-Z]/)
    .withMessage("Lozinka mora sadržavati barem jedno veliko slovo.")
    .matches(/[0-9]/)
    .withMessage("Lozinka mora sadržavati barem jedan broj.")
    .matches(/[a-z]/)
    .withMessage("Lozinka mora sadržavati barem jedno malo slovo."),

  handleValidationErrors,
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email adresa je obavezno polje")
    .escape()
    .isEmail()
    .withMessage("Email adresa nije ispravna")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Lozinka je obavezna"),

  handleValidationErrors,
];
