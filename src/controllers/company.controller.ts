import { Request, Response } from "express";
import { errorMessage } from "../utils/HandleError";
import CompanyServices from "../services/company.services";
import { CODE } from "../utils/constants";

interface Params {
  id: string;
}

class CompanyController {
  public create = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const response = await CompanyServices.createCompany(body);
      res
        .status(CODE.CREATED)
        .json({ data: response, message: "Empresa Creada Correctamente" });
    } catch (error) {
      errorMessage(res, error);
    }
  };

  public getCompanies = async (_: Request, res: Response) => {
    try {
      const response = await CompanyServices.getCompanies();
      res.status(CODE.OK).json({ data: response });
    } catch (error) {
      errorMessage(res, error);
    }
  };

  public getCompany = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(CODE.BAD_REQUEST).json({ error: "ID is required" });
      }

      const response = await CompanyServices.getCompany(id);
      if (!response) {
        return res
          .status(CODE.NOT_FOUND)
          .json({ error: "Empresa no encontrada" });
      }
      res.status(CODE.OK).json({ data: response });
    } catch (error) {
      errorMessage(res, error);
    }
  };

  public updateCompany = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
      if (!id) {
        return res.status(CODE.BAD_REQUEST).json({ error: "ID is required" });
      }
      const response = await CompanyServices.updateCompany(id, body);
      res.status(CODE.OK).json({ data: response });
    } catch (error) {
      errorMessage(res, error);
    }
  };
}

export default new CompanyController();
