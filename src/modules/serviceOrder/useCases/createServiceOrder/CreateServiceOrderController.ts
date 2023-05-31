import { Request, Response } from "express";
import { CreateServiceOrderUseCase } from "./CreateServiceOrderUseCase";

export class CreateServiceOrderController {
  async handle(request: Request, response: Response) {
    const { matricula, secretKey } = request.params;
    const {
      convenio,
      nome,
      setorSolic,
      filaColeta,
      sexo,
      cpf,
      dtNasc,
      nomeMae,
    } = request.body;

    const createServiceOrderUseCase = new CreateServiceOrderUseCase();
    const result = await createServiceOrderUseCase.execute({
      nome,
      convenio,
      setorSolic,
      filaColeta,
      sexo,
      cpf,
      dtNasc,
      nomeMae,
      matricula,
      secretKey,
    });

    return response.json(result);
  }
}
