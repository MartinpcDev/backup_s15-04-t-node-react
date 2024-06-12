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
const cargo_service_1 = __importDefault(require("../services/cargo.service"));
const constants_1 = require("../utils/constants");
const HandleError_1 = require("../utils/HandleError");
class CargoController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cargos = yield cargo_service_1.default.getAll();
                res.status(constants_1.CODE.OK).json({ data: cargos, message: 'Cargos encontrados' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cargo = yield cargo_service_1.default.getById(id);
                res.status(constants_1.CODE.OK).json({ data: cargo, message: 'Cargo encontrado' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const newCargo = yield cargo_service_1.default.create(body);
                res
                    .status(constants_1.CODE.CREATED)
                    .json({ data: newCargo, message: 'Cargo Creado' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                const updateCargo = yield cargo_service_1.default.update(id, body);
                res
                    .status(constants_1.CODE.ACCEPTED)
                    .json({ data: updateCargo, message: 'Cargo Actualizado' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield cargo_service_1.default.delete(id);
                res.status(constants_1.CODE.ACCEPTED).json({ message: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
    }
}
exports.default = new CargoController();
