import { Empresa } from "@prisma/client";
import { prisma } from "../config/prisma";
import { HttpException } from "../utils/HttpException";
import { CODE } from "../utils/constants";

class CompanyServices {
  public createCompany = async (data: Empresa) => {
    console.log(data);
    try {
      const newCompany = await prisma.empresa.create({
        data,
        select: { id: true, name: true, cuit: true, email: true, sector: true },
      });
      return newCompany;
    } catch (error) {
      console.log(error);
      throw new HttpException(CODE.BAD_REQUEST, "No se pudo crear la empresa");
    }
  };

  public getCompanies = async () => {
    try {
      const companies = await prisma.empresa.findMany({
        include: { Usuario: true },
      });
      return companies;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo obtener las empresas"
      );
    }
  };

  public getCompany = async (id: string) => {
    try {
      const company = await prisma.empresa.findUnique({
        where: { id },
        include: { Usuario: true },
      });
      return company;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo obtener la empresa"
      );
    }
  };

  public updateCompany = async (id: string, data: Empresa) => {
    try {
      const company = await prisma.empresa.update({
        where: { id },
        data,
      });
      return company;
    } catch (error) {
      throw new HttpException(
        CODE.BAD_REQUEST,
        "No se pudo actualizar la empresa"
      );
    }
  };
}

export default new CompanyServices();
