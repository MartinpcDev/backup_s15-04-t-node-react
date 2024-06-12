"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const express_validator_1 = require("express-validator");
const validationInput_1 = require("../middlewares/validationInput");
const validateSession_1 = require("../middlewares/validateSession");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.body)('email').isEmail().withMessage('Email no valido'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('El password es muy corto, mínimo de 8 caracteres'), (0, express_validator_1.body)('nombre')
    .isLength({ min: 3 })
    .withMessage('El nombre es muy corto, mínimo de 4 caracteres'), (0, express_validator_1.body)('apellido')
    .isLength({ min: 3 })
    .withMessage('El apellido es muy corto,mínimo de 5 caracteres'), (0, express_validator_1.body)('dni')
    .isInt({ min: 10000000, max: 99999999 })
    .withMessage('El dni debe estar entre 10000000 y 99999999'), validationInput_1.HandleInputErrors, user_controller_1.default.register);
router.post('/login', (0, express_validator_1.body)('email').isEmail().withMessage('Email no valido'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('El password es muy corto, mínimo de 8 caracteres'), validationInput_1.HandleInputErrors, user_controller_1.default.login);
router.put('/:id', validateSession_1.isLogged, (0, express_validator_1.param)('id').isUUID().withMessage('Id no valido debe ser un UUID'), (0, express_validator_1.body)('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('El password es muy corto, mínimo de 8 caracteres'), (0, express_validator_1.body)('nombre')
    .optional()
    .isLength({ min: 3 })
    .withMessage('El nombre es muy corto, mínimo de 4 caracteres'), (0, express_validator_1.body)('apellido')
    .optional()
    .isLength({ min: 3 })
    .withMessage('El apellido es muy corto,mínimo de 5 caracteres'), (0, express_validator_1.body)('dni')
    .optional()
    .isInt({ min: 10000000, max: 99999999 })
    .withMessage('El dni debe estar entre 10000000 y 99999999'), (0, express_validator_1.body)('telefono')
    .optional()
    .isMobilePhone('es-AR')
    .withMessage('debe cumplir el formato de telefono ES-AR'), (0, express_validator_1.body)('direccion')
    .optional()
    .isString()
    .withMessage('La direccion debe ser un string'), (0, express_validator_1.body)('ciudad')
    .optional()
    .isString()
    .withMessage('La ciudad debe ser un string'), validationInput_1.HandleInputErrors, user_controller_1.default.update);
router.get('/', validateSession_1.isLogged, user_controller_1.default.getSession);
exports.default = router;
