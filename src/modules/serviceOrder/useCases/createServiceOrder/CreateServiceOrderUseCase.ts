import { prisma } from "@/shared/infra/prisma/prisma";
import moment from "moment-timezone";

interface ICreateServiceOrder {
  setorSolic: string;
  nome: string;
  convenio: string;
  dtNasc: Date;
  cpf: string;
  sexo: string;
  nomeMae: string;
  matricula: string;
  secretKey: string;
}

export class CreateServiceOrderUseCase {
  async execute({
    nome,
    convenio,
    setorSolic,
    sexo,
    cpf,
    dtNasc,
    nomeMae,
    matricula,
    secretKey,
  }: //guia,
  ICreateServiceOrder) {
    const now = new Date();
    now.setHours(now.getHours() - 3);
    const checkSecretKey = await prisma.sTR.findFirstOrThrow({
      where: {
        str_acesso_api: secretKey,
      },
    });

    const checkPatientPlate = await prisma.pAC.findFirst({
      where: { PAC_MCNV: matricula },
    });

    const checkPatientCPF = await prisma.pAC.findFirst({
      where: { PAC_NUMCPF: cpf },
    });

    const serie = "" + 1 + (Number(new Date().getFullYear()) % 100);
    const cntPac = await prisma.cNT.findFirst({ where: { CNT_TIPO: "PAC" } });
    const cntOsm = await prisma.cNT.findFirst({
      where: { CNT_SERIE: Number(serie), CNT_TIPO: "OSM" },
    });

    const cntPacNew = cntPac.CNT_NUM + 1;
    const cntOsmNew = cntOsm.CNT_NUM + 1;

    if (checkPatientPlate) {
      const patient = await prisma.oSM.create({
        data: {
          OSM_SERIE: Number(serie),
          OSM_PAC: checkPatientPlate.PAC_REG,
          OSM_NUM: cntOsmNew,
          OSM_DTHR: now,
          OSM_MCNV: matricula,
          OSM_CNV: convenio,
          //OSM_CTLE_CNV: guia,
          OSM_MREQ: 0,
          OSM_PROC: "A",
          OSM_STR: setorSolic,
          OSM_IND_URG: "N",
          OSM_DT_RESULT: now,
          OSM_ATEND: "ASS",
          OSM_LEG_COD: "WEB",
          OSM_USR_LOGIN_CAD: "IUC",
          OSM_IND_WEB: "S",
          FLE: {
            create: {
              FLE_DTHR_CHEGADA: now,
              FLE_PSV_COD: 294,
              FLE_STR_COD: setorSolic,
              FLE_PAC_REG: checkPatientPlate.PAC_REG,
              FLE_ORDEM: 1,
              FLE_STATUS: "A",
              FLE_USR_LOGIN: "IUC",
              FLE_OBS: "AUTO ATENDIMENTO",
              FLE_PSV_RESP: 294,
              FLE_DTHR_REG: now,
              FLE_PROCED: "TOT",
            },
          },
        },
      });

      await prisma.cNT.update({
        where: {
          CNT_TIPO_CNT_SERIE: { CNT_SERIE: Number(serie), CNT_TIPO: "OSM" },
        },
        data: {
          CNT_NUM: cntOsmNew,
        },
      });

      return patient;
    } else if (checkPatientCPF) {
      // const checkOsDay = await prisma.oSM.findFirst({
      //   where: {
      //     OSM_PAC: checkPatientCPF.PAC_REG,
      //   },
      // });

      // if (checkOsDay) throw new Error("Já existe OS no dia");

      const patient = await prisma.oSM.create({
        data: {
          OSM_SERIE: Number(serie),
          OSM_PAC: checkPatientCPF.PAC_REG,
          OSM_NUM: cntOsmNew,
          OSM_DTHR: now,
          OSM_MCNV: matricula,
          OSM_CNV: convenio,
          //OSM_CTLE_CNV: guia,
          OSM_MREQ: 0,
          OSM_PROC: "A",
          OSM_STR: setorSolic,
          OSM_IND_URG: "N",
          OSM_DT_RESULT: now,
          OSM_ATEND: "ASS",
          OSM_LEG_COD: "WEB",
          OSM_USR_LOGIN_CAD: "IUC",
          OSM_IND_WEB: "S",
          FLE: {
            create: {
              FLE_DTHR_CHEGADA: now,
              FLE_PSV_COD: 294,
              FLE_STR_COD: setorSolic,
              FLE_PAC_REG: checkPatientPlate.PAC_REG,
              FLE_ORDEM: 1,
              FLE_STATUS: "A",
              FLE_USR_LOGIN: "IUC",
              FLE_OBS: "AUTO ATENDIMENTO",
              FLE_PSV_RESP: 294,
              FLE_DTHR_REG: now,
              FLE_PROCED: "TOT",
            },
          },
        },
      });

      await prisma.cNT.update({
        where: {
          CNT_TIPO_CNT_SERIE: { CNT_SERIE: Number(serie), CNT_TIPO: "OSM" },
        },
        data: {
          CNT_NUM: cntOsmNew,
        },
      });

      return patient;
    } else {
      const patient = await prisma.pAC.create({
        data: {
          PAC_REG: cntPacNew,
          PAC_NOME: nome,
          PAC_SEXO: sexo,
          PAC_CNV: convenio,
          PAC_DREG: now,
          PAC_NASC: new Date(dtNasc),
          PAC_NOME_MAE: nomeMae,
          PAC_MCNV: matricula,
          OSM: {
            create: {
              OSM_SERIE: Number(serie),
              OSM_NUM: cntOsmNew,
              OSM_DTHR: now,
              OSM_CNV: convenio,
              //OSM_CTLE_CNV: guia,
              OSM_MREQ: 0,
              OSM_PROC: "A",
              OSM_STR: setorSolic,
              OSM_IND_URG: "N",
              OSM_DT_RESULT: now,
              OSM_ATEND: "ASS",
              OSM_LEG_COD: "WEB",
              OSM_USR_LOGIN_CAD: "IUC",
              OSM_IND_WEB: "S",
              FLE: {
                create: {
                  FLE_DTHR_CHEGADA: now,
                  FLE_PSV_COD: 294,
                  FLE_STR_COD: setorSolic,
                  FLE_PAC_REG: cntPacNew,
                  FLE_ORDEM: 1,
                  FLE_STATUS: "A",
                  FLE_USR_LOGIN: "IUC",
                  FLE_OBS: "AUTO ATENDIMENTO",
                  FLE_PSV_RESP: 294,
                  FLE_DTHR_REG: now,
                  FLE_PROCED: "TOT",
                },
              },
            },
          },
        },
      });

      await prisma.cNT.update({
        where: {
          CNT_TIPO_CNT_SERIE: { CNT_SERIE: 0, CNT_TIPO: "PAC" },
        },
        data: {
          CNT_NUM: cntPacNew,
        },
      });

      await prisma.cNT.update({
        where: {
          CNT_TIPO_CNT_SERIE: { CNT_SERIE: Number(serie), CNT_TIPO: "OSM" },
        },
        data: {
          CNT_NUM: cntOsmNew,
        },
      });

      return { patient };
    }
  }
}
