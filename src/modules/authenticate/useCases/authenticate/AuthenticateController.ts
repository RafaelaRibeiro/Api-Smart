import { Request, Response } from "express";
import { AuthenticateUseCase } from "./AuthenticateUseCase";

export class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { secretKey } = request.params;

    const authenticateUseCase = new AuthenticateUseCase();

    const result = await authenticateUseCase.execute(secretKey);

    return response.json(result);
  }
}
