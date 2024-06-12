import { Router } from "express";
import CompanyController from "../controllers/company.controller";
import { body } from "express-validator";
import { HandleInputErrors } from "../middlewares/validationInput";
import { isAdmin } from "../middlewares/validateAdmin";

const router: Router = Router();

router.post(
  "/create",
  body("name").isString().notEmpty().withMessage("Nombre no valido"),
  body("cuit").isInt().notEmpty().withMessage("Rut no válido"),
  body("webSite").isString().optional().withMessage("Sitio web no válido"),
  body("address")
    .isString()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Dirección no válida"),
  body("city").isString().notEmpty().withMessage("Ciudad no válida"),
  body("country").isString().notEmpty().withMessage("País no válido"),
  body("phone").isString().notEmpty().withMessage("Teléfono no válido"),
  body("email").isEmail().notEmpty().withMessage("Email no válido"),
  body("sector").isString().notEmpty().withMessage("Sector no válido"),

  HandleInputErrors,
  isAdmin,
  CompanyController.create
);

router.get("/", isAdmin, CompanyController.getCompanies);
router.get("/:id", isAdmin, CompanyController.getCompany);

router.patch(
  "/:id",
  body("name").isString().optional().withMessage("Nombre no valido"),
  body("cuit").isInt().optional().withMessage("Rut no válido"),
  body("webSite").isString().optional().withMessage("Sitio web no válido"),

  body("address")
    .isString()
    .optional()
    .isLength({ min: 5 })
    .withMessage("Dirección no válida"),
  body("city").isString().optional().withMessage("Ciudad no válida"),
  body("country").isString().optional().withMessage("País no válido"),
  body("phone").isString().optional().withMessage("Teléfono no válido"),
  body("email").isEmail().optional().withMessage("Email no válido"),
  body("sector").isString().optional().withMessage("Sector no válido"),

  HandleInputErrors,
  isAdmin,
  CompanyController.updateCompany
);

export default router;
