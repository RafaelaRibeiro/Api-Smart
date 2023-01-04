import { prisma } from "@/shared/infra/prisma/prisma";
import moment from "moment-timezone";

export class ListPatientUseCase {
  async execute(
    matricula: string,
    cpf: string,
    name: string,
    secretKey: string
  ) {
    const checkSecretKey = await prisma.sTR.findFirstOrThrow({
      where: {
        str_acesso_api: secretKey,
      },
    });

    // var now = new Date();
    // now.setHours(now.getHours() - 3);

    const now = moment().tz("America/Sao_Paulo").format();

    const checkPatientPlate = await prisma.pAC.findFirst({
      where: { PAC_MCNV: matricula },
    });

    const checkPatientCPF = await prisma.pAC.findFirst({
      where: { PAC_NUMCPF: cpf },
    });

    if (checkPatientPlate) {
      return { now, checkPatientPlate };
    } else if (checkPatientCPF) {
      return { now, checkPatientCPF };
    } else {
      return { matricula, cpf, name, now };
    }
  }
}
