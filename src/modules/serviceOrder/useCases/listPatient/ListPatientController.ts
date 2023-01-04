import { Request, Response } from "express";
import { ListPatientUseCase } from "./ListPatientUseCase";

export class ListPatientController {
  async handle(request: Request, response: Response) {
    const { matricula, secretKey } = request.params;
    const { name, cpf } = request.body;

    const listPatientUseCase = new ListPatientUseCase();
    const result = await listPatientUseCase.execute(
      matricula,
      cpf,
      name,
      secretKey
    );

    return response.json(result);
  }
}
