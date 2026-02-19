import { validationResult } from "express-validator";

export const handleCollectionValidation = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  return res.status(400).json({ errors: errors.array() });
};
