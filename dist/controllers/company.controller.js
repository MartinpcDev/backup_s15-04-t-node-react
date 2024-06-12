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
const company_services_1 = __importDefault(require("../services/company.services"));
const constants_1 = require("../utils/constants");
class CompanyController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const response = yield company_services_1.default.createCompany(body);
                res
                    .status(constants_1.CODE.CREATED)
                    .json({ data: response, message: "Empresa Creada Correctamente" });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getCompanies = (_, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield company_services_1.default.getCompanies();
                res.status(constants_1.CODE.OK).json({ data: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(constants_1.CODE.BAD_REQUEST).json({ error: "ID is required" });
                }
                const response = yield company_services_1.default.getCompany(id);
                if (!response) {
                    return res
                        .status(constants_1.CODE.NOT_FOUND)
                        .json({ error: "Empresa no encontrada" });
                }
                res.status(constants_1.CODE.OK).json({ data: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.updateCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                if (!id) {
                    return res.status(constants_1.CODE.BAD_REQUEST).json({ error: "ID is required" });
                }
                const response = yield company_services_1.default.updateCompany(id, body);
                res.status(constants_1.CODE.OK).json({ data: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
    }
}
exports.default = new CompanyController();
