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
class LicenseApplicationServices {
    constructor() {
        this.createLicense = (data, user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma_1.prisma.solicitudLicencia.create({
                    data: Object.assign(Object.assign({}, data), { usuarioId: user.id }),
                });
                return response;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo crear la solicitud");
            }
        });
        this.getAllLicenses = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma_1.prisma.solicitudLicencia.findMany({
                    include: { Usuario: true },
                });
                return response;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo obtener las solicitudes");
            }
        });
        this.getMyLicenses = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma_1.prisma.solicitudLicencia.findMany({
                    where: { usuarioId: user.id },
                });
                return response;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo obtener las solicitudes");
            }
        });
        this.getLicense = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma_1.prisma.solicitudLicencia.findUnique({
                    where: { id },
                });
                return response;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo obtener la solicitud");
            }
        });
        this.updateLicense = (id, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma_1.prisma.solicitudLicencia.update({
                    where: { id },
                    data,
                });
                return response;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo actualizar la solicitud");
            }
        });
    }
}
exports.default = new LicenseApplicationServices();
