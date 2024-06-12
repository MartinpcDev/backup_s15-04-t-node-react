import { Router } from "express";
import LicenseAplicationController from "../controllers/licenseAplication.controller";

import { body } from "express-validator";
import { HandleInputErrors } from "../middlewares/validationInput";
import { isAdmin } from "../middlewares/validateAdmin";
import { isLogged } from "../middlewares/validateSession";
import { isEmployee } from "../middlewares/validateEmployee";

const router: Router = Router();

router.post(
  "/create",
  body("motivo").isString().notEmpty().withMessage("Motivo no valido"),
  body("tipo").isString().notEmpty().withMessage("Tipo no valido"),
  body("fecha_inicio")
    .custom((value) => !isNaN(Date.parse(value)))
    .notEmpty()
    .withMessage("Fecha de inicio no valida"),
  body("fecha_fin")
    .custom((value) => !isNaN(Date.parse(value)))
    .notEmpty()
    .withMessage("Fecha de fin no valida"),
  HandleInputErrors,

  isEmployee,
  LicenseAplicationController.create
);
router.get("/AllLicenses", isAdmin, LicenseAplicationController.getLicenses);
router.get(
  "/myLicenses",
  isEmployee,
  LicenseAplicationController.getMyLicenses
);

router.get("/:id", isLogged, LicenseAplicationController.getLicense);
router.patch("/:id", isAdmin, LicenseAplicationController.updateLicense);

export default router;
