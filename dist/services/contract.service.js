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
const database_1 = require("../database");
const user_service_1 = __importDefault(require("./user.service"));
const cargo_service_1 = __importDefault(require("./cargo.service"));
const HttpException_1 = require("../utils/HttpException");
const constants_1 = require("../utils/constants");
class ContractService {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            const usuarioFound = yield user_service_1.default.getById(data.usuarioId);
            if (usuarioFound.contrato.length !== 0) {
                throw new HttpException_1.HttpException(constants_1.CODE.BAD_REQUEST, 'Ya hay un contrato Activo');
            }
            const cargoFound = yield cargo_service_1.default.getById(data.cargoId);
            const contract = yield database_1.prisma.contrato.create({
                data: {
                    salario: data.salario,
                    status: 'ACTIVO',
                    descripcion: data.descripcion,
                    fecha_inicio: new Date(data.fecha_inicio),
                    fecha_fin: new Date(data.fecha_fin),
                    usuarioId: usuarioFound.id,
                    cargoId: cargoFound.id
                }
            });
            yield user_service_1.default.update(usuarioFound.id, { rol: 'EMPLEADO' });
            return contract;
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const contracts = yield database_1.prisma.contrato.findMany({
                include: { Cargo: true, Usuario: true }
            });
            if (contracts.length === 0) {
                throw new HttpException_1.HttpException(constants_1.CODE.NOT_FOUND, 'No hay contratos que mostrar');
            }
            return contracts;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield database_1.prisma.contrato.findUnique({
                where: { id },
                include: { Cargo: true, Usuario: true }
            });
            if (!contract) {
                throw new HttpException_1.HttpException(constants_1.CODE.NOT_FOUND, 'El contrato no existe');
            }
            return contract;
        });
        this.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const contractFound = yield this.getById(id);
            let updatedContract = {};
            if (data.cargoId && data.usuarioId) {
                Promise.allSettled([
                    cargo_service_1.default.getById(data.cargoId),
                    user_service_1.default.getById(data.usuarioId),
                    user_service_1.default.update(contractFound.usuarioId, { rol: 'USER' }),
                    user_service_1.default.update(data.usuarioId, { rol: 'EMPLEADO' })
                ]);
                updatedContract = yield database_1.prisma.contrato.update({
                    where: { id: contractFound.id },
                    data
                });
            }
            else if (data.cargoId) {
                yield cargo_service_1.default.getById(data.cargoId);
                updatedContract = yield database_1.prisma.contrato.update({
                    where: { id: contractFound.id },
                    data
                });
            }
            else if (data.usuarioId) {
                Promise.allSettled([
                    user_service_1.default.getById(data.usuarioId),
                    user_service_1.default.update(contractFound.usuarioId, { rol: 'USER' }),
                    user_service_1.default.update(data.usuarioId, { rol: 'EMPLEADO' })
                ]);
                updatedContract = yield database_1.prisma.contrato.update({
                    where: { id: contractFound.id },
                    data
                });
            }
            else {
                updatedContract = yield database_1.prisma.contrato.update({
                    where: { id: contractFound.id },
                    data
                });
            }
            return updatedContract;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield this.getById(id);
            let message = '';
            yield database_1.prisma.contrato.delete({ where: { id } });
            message = 'Contrato eliminado';
            if ((contract.status = 'ACTIVO')) {
                yield user_service_1.default.update(contract.usuarioId, { rol: 'USER' });
                message = 'Contrato Eliminado y Rol de usuario Cambiado a User';
            }
            return message;
        });
    }
}
exports.default = new ContractService();
