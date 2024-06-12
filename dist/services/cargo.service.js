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
const database_1 = require("../database");
const HttpException_1 = require("../utils/HttpException");
const constants_1 = require("../utils/constants");
class CargoService {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            const newCargo = yield database_1.prisma.cargo.create({ data });
            if (!newCargo) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, 'No se pudo crear el cargo');
            }
            return newCargo;
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const cargos = yield database_1.prisma.cargo.findMany({});
            if (!cargos || cargos.length === 0) {
                throw new HttpException_1.HttpException(constants_1.CODE.NOT_FOUND, 'No hay cargos a mostrar');
            }
            return cargos;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const cargo = yield database_1.prisma.cargo.findUnique({ where: { id } });
            if (!cargo) {
                throw new HttpException_1.HttpException(constants_1.CODE.NOT_FOUND, 'El cargo no existe');
            }
            return cargo;
        });
        this.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const cargoFound = yield this.getById(id);
            const updatedCargo = yield database_1.prisma.cargo.update({
                where: { id: cargoFound.id },
                data
            });
            return updatedCargo;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const cargoFound = yield this.getById(id);
            yield database_1.prisma.cargo.delete({ where: { id: cargoFound.id } });
            return 'Cargo Borrado Satisfactoriamente';
        });
    }
}
exports.default = new CargoService();
