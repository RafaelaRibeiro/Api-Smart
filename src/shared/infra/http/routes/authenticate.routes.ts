import { AuthenticateController } from "@/modules/authenticate/useCases/authenticate/AuthenticateController";
import { Router } from "express";

const authRouter = Router();

const authenticateController = new AuthenticateController();

authRouter.post("/:secretKey", authenticateController.handle);

export default authRouter;
