"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contract_controller_1 = __importDefault(require("../controllers/contract.controller"));
const express_validator_1 = require("express-validator");
const validationInput_1 = require("../middlewares/validationInput");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const router = (0, express_1.Router)();
router.use(validateAdmin_1.isAdmin);
router.get('/', contract_controller_1.default.getAll);
router.get('/:id', (0, express_validator_1.param)('id')
    .notEmpty()
    .withMessage('El param id no puede ir vació')
    .isUUID()
    .withMessage('ID no valido'), validationInput_1.HandleInputErrors, contract_controller_1.default.getById);
router.post('/', (0, express_validator_1.body)('usuarioId')
    .notEmpty()
    .withMessage('El usuario_id no puede ir vació')
    .isUUID()
    .withMessage('ID no valido'), (0, express_validator_1.body)('salario')
    .notEmpty()
    .isInt()
    .withMessage('el salario debe ser un entero'), (0, express_validator_1.body)('descripcion')
    .notEmpty()
    .isString()
    .withMessage('La descripcion debe ser un string'), (0, express_validator_1.body)('cargoId')
    .notEmpty()
    .isUUID()
    .withMessage('El cargo_id debe ser UUID valido'), (0, express_validator_1.body)('fecha_inicio').notEmpty().isDate().withMessage('fecha requerida'), (0, express_validator_1.body)('fecha_fin').notEmpty().isDate().withMessage('fecha requerida'), validationInput_1.HandleInputErrors, contract_controller_1.default.create);
router.put('/:id', (0, express_validator_1.param)('id')
    .notEmpty()
    .withMessage('El param id no puede ir vació')
    .isUUID()
    .withMessage('ID no valido'), (0, express_validator_1.body)('usuarioId').optional().isUUID().withMessage('ID no valido'), (0, express_validator_1.body)('salario')
    .optional()
    .isInt()
    .withMessage('el salario debe ser un entero'), (0, express_validator_1.body)('descripcion')
    .optional()
    .isString()
    .withMessage('La descripcion debe ser un string'), (0, express_validator_1.body)('cargoId')
    .optional()
    .isUUID()
    .withMessage('El cargo_id debe ser UUID valido'), (0, express_validator_1.body)('fecha_inicio').optional().isDate().withMessage('fecha requerida'), (0, express_validator_1.body)('fecha_fin').optional().isDate().withMessage('fecha requerida'), validationInput_1.HandleInputErrors, contract_controller_1.default.update);
router.delete('/:id', (0, express_validator_1.param)('id')
    .notEmpty()
    .withMessage('El param id no puede ir vació')
    .isUUID()
    .withMessage('ID no valido'), validationInput_1.HandleInputErrors, contract_controller_1.default.delete);
exports.default = router;
