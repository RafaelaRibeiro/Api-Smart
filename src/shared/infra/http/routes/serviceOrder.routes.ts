import { CreateServiceOrderController } from "@/modules/serviceOrder/useCases/createServiceOrder/CreateServiceOrderController";
import { ListPatientController } from "@/modules/serviceOrder/useCases/listPatient/ListPatientController";
import { Router } from "express";

const serviceOrderRouter = Router();

const createServiceOrderController = new CreateServiceOrderController();
const listPatientController = new ListPatientController();

serviceOrderRouter.post(
  "/:secretKey/create/:matricula",
  createServiceOrderController.handle
);

serviceOrderRouter.get(
  "/:secretKey/list/:matricula",
  listPatientController.handle
);

export default serviceOrderRouter;
