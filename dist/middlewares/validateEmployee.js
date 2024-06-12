"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmployee = void 0;
const HandleError_1 = require("../utils/HandleError");
const HttpException_1 = require("../utils/HttpException");
const constants_1 = require("../utils/constants");
const authHandler_1 = require("../utils/authHandler");
const user_service_1 = __importDefault(require("../services/user.service"));
const jsonwebtoken_1 = require("jsonwebtoken");
const isEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearer = req.headers.authorization;
        if (!bearer) {
            throw new HttpException_1.HttpException(constants_1.CODE.UNAUTHORIZED_ACCESS, 'No autorizado');
        }
        const [, token] = bearer.split(' ');
        if (!token) {
            throw new HttpException_1.HttpException(constants_1.CODE.UNAUTHORIZED_ACCESS, 'No se ha proporcionado un token');
        }
        const decodedToken = (0, authHandler_1.verifyToken)(token);
        if (typeof decodedToken === 'object' && decodedToken.id) {
            const user = yield user_service_1.default.getById(decodedToken.id);
            if (!user) {
                throw new HttpException_1.HttpException(constants_1.CODE.UNAUTHORIZED_ACCESS, 'Toke no Valido');
            }
            if (user.rol === constants_1.ROLE.ADMIN || user.rol === constants_1.ROLE.EMPLEADO) {
                req.user = user;
                next();
            }
            else {
                throw new HttpException_1.HttpException(constants_1.CODE.UNAUTHORIZED_ACCESS, 'Necesitas ser Administrador o Empleado para completar la operación');
            }
        }
        else {
            res.status(constants_1.CODE.UNAUTHORIZED_ACCESS).json({ message: 'Token no Valido' });
        }
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            res.status(constants_1.CODE.UNAUTHORIZED_ACCESS).json({ message: 'Token Expirado' });
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            res.status(constants_1.CODE.UNAUTHORIZED_ACCESS).json({ message: 'Token no valido' });
        }
        else {
            (0, HandleError_1.errorMessage)(res, error);
        }
    }
});
exports.isEmployee = isEmployee;
