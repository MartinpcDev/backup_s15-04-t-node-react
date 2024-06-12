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
class CompanyServices {
    constructor() {
        this.createCompany = (data) => __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            try {
                const newCompany = yield prisma_1.prisma.empresa.create({
                    data,
                    select: { id: true, name: true, cuit: true, email: true, sector: true },
                });
                return newCompany;
            }
            catch (error) {
                console.log(error);
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo crear la empresa");
            }
        });
        this.getCompanies = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield prisma_1.prisma.empresa.findMany({
                    include: { Usuario: true },
                });
                return companies;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo obtener las empresas");
            }
        });
        this.getCompany = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield prisma_1.prisma.empresa.findUnique({
                    where: { id },
                    include: { Usuario: true },
                });
                return company;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo obtener la empresa");
            }
        });
        this.updateCompany = (id, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield prisma_1.prisma.empresa.update({
                    where: { id },
                    data,
                });
                return company;
            }
            catch (error) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, "No se pudo actualizar la empresa");
            }
        });
    }
}
exports.default = new CompanyServices();
