import { Request, Response } from "express";
import { errorMessage } from "../utils/HandleError";
import licenseAplicationServices from "../services/licenseAplication.services";
import { CODE } from "../utils/constants";
import { body } from "express-validator";
import { decode } from "punycode";

class LicenseApplicationController {
  public create = async (req: Request, res: Response) => {
    try {
      const { body, user } = req;
      const response = await licenseAplicationServices.createLicense(
        body,
        user
      );
      res
        .status(CODE.CREATED)
        .json({ data: response, message: "Solicitud Creada Correctamente" });
    } catch (error) {
      errorMessage(res, error);
    }
  };

  public getLicenses = async (req: Request, res: Response) => {
    try {
      const response = await licenseAplicationServices.getAllLicenses();
      res.status(CODE.OK).json({ data: response });
    } catch (error) {
      errorMessage(res, error);
    }
  };

  public getMyLicenses = async (req: Request, res: Response) => {
    const { user } = req;

    try {
      const response = await licenseAplicationServices.getMyLicenses(user);
      res.status(CODE.OK).json({ data: response });
    } catch (error) {
      errorMessage(res, error);
    }
  };

  public getLicense = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(CODE.BAD_REQUEST).json({ error: "ID is required" });
      }

      const response = await licenseAplicationServices.getLicense(id);
      if (!response) {
        return res
          .status(CODE.NOT_FOUND)
          .json({ error: "Solicitud licencia no encontrada" });
      }
      res.status(CODE.OK).json({ data: response });
    } catch (error) {
      errorMessage(res, error);
    }
  };

  public updateLicense = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
      if (!id) {
        return res.status(CODE.BAD_REQUEST).json({ error: "ID is required" });
      }
      const response = await licenseAplicationServices.updateLicense(id, body);
      res.status(CODE.OK).json({ data: response });
    } catch (error) {
      errorMessage(res, error);
    }
  };
}

export default new LicenseApplicationController();
