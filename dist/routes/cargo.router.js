"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cargo_controller_1 = __importDefault(require("../controllers/cargo.controller"));
const express_validator_1 = require("express-validator");
const validationInput_1 = require("../middlewares/validationInput");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const router = (0, express_1.Router)();
router.use(validateAdmin_1.isAdmin);
router.get('/', cargo_controller_1.default.getAll);
router.post('/', (0, express_validator_1.body)('nombre')
    .notEmpty()
    .withMessage('El nombre no puede ir vació')
    .isString()
    .withMessage('el nombre debe ser un string'), (0, express_validator_1.body)('descripcion')
    .notEmpty()
    .isString()
    .withMessage('La descripcion no puede ir vació')
    .isString()
    .withMessage('el nombre debe ser un string'), validationInput_1.HandleInputErrors, cargo_controller_1.default.create);
router.get('/:id', (0, express_validator_1.param)('id').isUUID().withMessage('El id debe ser un UUID'), validationInput_1.HandleInputErrors, cargo_controller_1.default.getById);
router.put('/:id', (0, express_validator_1.param)('id').isUUID().withMessage('El id debe ser un UUID'), (0, express_validator_1.body)('nombre')
    .optional()
    .isString()
    .withMessage('el nombre debe ser un string'), (0, express_validator_1.body)('descripcion')
    .optional()
    .isString()
    .withMessage('la descripcion de be ser un string'), validationInput_1.HandleInputErrors, cargo_controller_1.default.update);
router.delete('/:id', (0, express_validator_1.param)('id').isUUID().withMessage('El id debe ser un UUID'), validationInput_1.HandleInputErrors, cargo_controller_1.default.delete);
exports.default = router;
