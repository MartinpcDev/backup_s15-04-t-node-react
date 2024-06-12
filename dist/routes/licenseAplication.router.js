"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const licenseAplication_controller_1 = __importDefault(require("../controllers/licenseAplication.controller"));
const express_validator_1 = require("express-validator");
const validationInput_1 = require("../middlewares/validationInput");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateSession_1 = require("../middlewares/validateSession");
const validateEmployee_1 = require("../middlewares/validateEmployee");
const router = (0, express_1.Router)();
router.post("/create", (0, express_validator_1.body)("motivo").isString().notEmpty().withMessage("Motivo no valido"), (0, express_validator_1.body)("tipo").isString().notEmpty().withMessage("Tipo no valido"), (0, express_validator_1.body)("fecha_inicio")
    .custom((value) => !isNaN(Date.parse(value)))
    .notEmpty()
    .withMessage("Fecha de inicio no valida"), (0, express_validator_1.body)("fecha_fin")
    .custom((value) => !isNaN(Date.parse(value)))
    .notEmpty()
    .withMessage("Fecha de fin no valida"), validationInput_1.HandleInputErrors, validateEmployee_1.isEmployee, licenseAplication_controller_1.default.create);
router.get("/AllLicenses", validateAdmin_1.isAdmin, licenseAplication_controller_1.default.getLicenses);
router.get("/myLicenses", validateEmployee_1.isEmployee, licenseAplication_controller_1.default.getMyLicenses);
router.get("/:id", validateSession_1.isLogged, licenseAplication_controller_1.default.getLicense);
router.patch("/:id", validateAdmin_1.isAdmin, licenseAplication_controller_1.default.updateLicense);
exports.default = router;
