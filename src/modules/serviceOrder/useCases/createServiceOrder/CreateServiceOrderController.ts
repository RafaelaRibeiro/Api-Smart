import { Request, Response } from "express";
import { CreateServiceOrderUseCase } from "./CreateServiceOrderUseCase";

export class CreateServiceOrderController {
  async handle(request: Request, response: Response) {
    const { matricula, secretKey } = request.params;
    const { convenio, nome, setorSolic, sexo, cpf, dtNasc, nomeMae, guia } =
      request.body;

    const createServiceOrderUseCase = new CreateServiceOrderUseCase();
    const result = await createServiceOrderUseCase.execute({
      nome,
      convenio,
      setorSolic,
      sexo,
      cpf,
      dtNasc,
      nomeMae,
      matricula,
      secretKey,
      guia,
    });

    return response.json(result);
  }
}
