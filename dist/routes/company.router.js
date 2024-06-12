"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = __importDefault(require("../controllers/company.controller"));
const express_validator_1 = require("express-validator");
const validationInput_1 = require("../middlewares/validationInput");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const router = (0, express_1.Router)();
router.post("/create", (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Nombre no valido"), (0, express_validator_1.body)("cuit").isInt().notEmpty().withMessage("Rut no válido"), (0, express_validator_1.body)("webSite").isString().optional().withMessage("Sitio web no válido"), (0, express_validator_1.body)("address")
    .isString()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Dirección no válida"), (0, express_validator_1.body)("city").isString().notEmpty().withMessage("Ciudad no válida"), (0, express_validator_1.body)("country").isString().notEmpty().withMessage("País no válido"), (0, express_validator_1.body)("phone").isString().notEmpty().withMessage("Teléfono no válido"), (0, express_validator_1.body)("email").isEmail().notEmpty().withMessage("Email no válido"), (0, express_validator_1.body)("sector").isString().notEmpty().withMessage("Sector no válido"), validationInput_1.HandleInputErrors, validateAdmin_1.isAdmin, company_controller_1.default.create);
router.get("/", validateAdmin_1.isAdmin, company_controller_1.default.getCompanies);
router.get("/:id", validateAdmin_1.isAdmin, company_controller_1.default.getCompany);
router.patch("/:id", (0, express_validator_1.body)("name").isString().optional().withMessage("Nombre no valido"), (0, express_validator_1.body)("cuit").isInt().optional().withMessage("Rut no válido"), (0, express_validator_1.body)("webSite").isString().optional().withMessage("Sitio web no válido"), (0, express_validator_1.body)("address")
    .isString()
    .optional()
    .isLength({ min: 5 })
    .withMessage("Dirección no válida"), (0, express_validator_1.body)("city").isString().optional().withMessage("Ciudad no válida"), (0, express_validator_1.body)("country").isString().optional().withMessage("País no válido"), (0, express_validator_1.body)("phone").isString().optional().withMessage("Teléfono no válido"), (0, express_validator_1.body)("email").isEmail().optional().withMessage("Email no válido"), (0, express_validator_1.body)("sector").isString().optional().withMessage("Sector no válido"), validationInput_1.HandleInputErrors, validateAdmin_1.isAdmin, company_controller_1.default.updateCompany);
exports.default = router;
