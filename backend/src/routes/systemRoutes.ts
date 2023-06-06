import { Router } from "express";

import * as sytemController from "../controllers/SystemController";

const sytemRoutes = Router();

sytemRoutes.post("/restartpm2", sytemController.restartPm2);

export default sytemRoutes;