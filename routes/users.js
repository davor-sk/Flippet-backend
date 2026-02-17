import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
});

export default router;
