import { prisma } from "@/shared/infra/prisma/prisma";
import { sign } from "jsonwebtoken";

export class AuthenticateUseCase {
  async execute(secretKey: string) {
    const department = await prisma.sTR.findFirstOrThrow({
      where: {
        str_acesso_api: secretKey,
      },
    });

    const strCod = department.STR_COD;

    const token = sign({ strCod }, department.str_acesso_api, {
      subject: department.STR_COD.toString(),
      expiresIn: "999 years",
    });

    return token;
  }
}
