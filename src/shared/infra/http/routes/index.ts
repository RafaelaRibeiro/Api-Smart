import { Router } from "express";
import authRouter from "./authenticate.routes";
import serviceOrderRouter from "./serviceOrder.routes";

const router = Router();

router.use("/serviceorder", serviceOrderRouter);
router.use("/auth", authRouter);
export { router };
