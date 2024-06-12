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
const HandleError_1 = require("../utils/HandleError");
const contract_service_1 = __importDefault(require("../services/contract.service"));
const constants_1 = require("../utils/constants");
class ContractController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const newContract = yield contract_service_1.default.create(body);
                res
                    .status(constants_1.CODE.CREATED)
                    .json({ data: newContract, message: 'Contrato Creado' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield contract_service_1.default.getAll();
                res
                    .status(constants_1.CODE.OK)
                    .json({ data: response, message: 'Contratos encontrados ' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield contract_service_1.default.getById(id);
                res
                    .status(constants_1.CODE.OK)
                    .json({ data: response, message: 'Contrato Encontrado' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                const updatedContract = yield contract_service_1.default.update(id, body);
                res
                    .status(constants_1.CODE.ACCEPTED)
                    .json({ data: updatedContract, message: 'Contrato Actualizado' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield contract_service_1.default.delete(id);
                res.status(constants_1.CODE.ACCEPTED).json({ message: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
    }
}
exports.default = new ContractController();
