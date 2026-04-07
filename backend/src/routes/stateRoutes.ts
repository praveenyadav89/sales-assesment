import { Router } from "express";
import { getStates, getDates } from "../controllers/stateController";

const router = Router();

router.get("/states", getStates);
router.get("/dates", getDates);

export default router;
