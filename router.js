import { Router } from "express";
import { checkAuth } from "./lib/middlewares.js";
import { getConfigsFromFilterParams } from "./controllers/main.js";
const router = Router();

// router.use(checkAuth);

router.get("/configs", getConfigsFromFilterParams);

router.get("/", (req, res) => {
  res.status(200).json(req.user || "hey");
});

export default router;
