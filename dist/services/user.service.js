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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
const HttpException_1 = require("../utils/HttpException");
const constants_1 = require("../utils/constants");
const authHandler_1 = require("../utils/authHandler");
class UserService {
    constructor() {
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.usuario.findUnique({
                where: { email }
            });
            if (!user) {
                return null;
            }
            return true;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.usuario.findUnique({
                where: { id },
                include: {
                    contrato: { where: { status: 'ACTIVO' } },
                    empresa: true,
                    solicitudesLicencia: true
                }
            });
            if (!user) {
                throw new HttpException_1.HttpException(constants_1.CODE.NOT_FOUND, 'Usuario no Existe');
            }
            return user;
        });
        this.createUser = (data) => __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.findByEmail(data.email);
            if (userExists) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, 'El usuario ya existe');
            }
            data.password = yield (0, authHandler_1.hashPassword)(data.password);
            const newUser = yield prisma_1.prisma.usuario.create({
                data,
                select: {
                    id: true,
                    email: true,
                    apellido: true,
                    nombre: true,
                    dni: true,
                    rol: true
                }
            });
            if (!newUser) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, 'No se pudo crear el usuario');
            }
            return newUser;
        });
        this.login = (data) => __awaiter(this, void 0, void 0, function* () {
            const userFound = yield prisma_1.prisma.usuario.findUnique({
                where: { email: data.email }
            });
            if (!userFound) {
                throw new HttpException_1.HttpException(constants_1.CODE.UNAUTHORIZED_ACCESS, 'El email es incorrecto');
            }
            const isPassword = yield (0, authHandler_1.comparePassword)(data.password, userFound.password);
            if (!isPassword) {
                throw new HttpException_1.HttpException(constants_1.CODE.UNAUTHORIZED_ACCESS, 'La password es incorrecta');
            }
            const payload = {
                id: userFound.id,
                email: userFound.email,
                rol: userFound.rol,
                dni: userFound.dni
            };
            const token = (0, authHandler_1.generateJwt)(payload);
            return token;
        });
        this.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.getById(id);
            const updatedUser = yield prisma_1.prisma.usuario.update({
                where: { id: userFound.id },
                data
            });
            if (!updatedUser) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, 'No se pudo actualizar el usuario');
            }
            return updatedUser;
        });
    }
}
exports.default = new UserService();
