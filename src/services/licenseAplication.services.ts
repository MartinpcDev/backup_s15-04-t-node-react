import { SolicitudLicencia } from "@prisma/client";
import { prisma } from "../config/prisma";
import { HttpException } from "../utils/HttpException";
import { CODE } from "../utils/constants";

class LicenseApplicationServices {
  public createLicense = async (data: SolicitudLicencia, user: any) => {
    try {
      const response = await prisma.solicitudLicencia.create({
        data: {
          ...data,
          usuarioId: user.id,
        },
      });
      return response;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo crear la solicitud"
      );
    }
  };

  public getAllLicenses = async () => {
    try {
      const response = await prisma.solicitudLicencia.findMany({
        include: { Usuario: true },
      });
      return response;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo obtener las solicitudes"
      );
    }
  };

  public getMyLicenses = async (user: any) => {
    try {
      const response = await prisma.solicitudLicencia.findMany({
        where: { usuarioId: user.id },
      });
      return response;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo obtener las solicitudes"
      );
    }
  };

  public getLicense = async (id: string) => {
    try {
      const response = await prisma.solicitudLicencia.findUnique({
        where: { id },
      });
      return response;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo obtener la solicitud"
      );
    }
  };

  public updateLicense = async (id: string, data: SolicitudLicencia) => {
    try {
      const response = await prisma.solicitudLicencia.update({
        where: { id },
        data,
      });
      return response;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo actualizar la solicitud"
      );
    }
  };
}

export default new LicenseApplicationServices();
