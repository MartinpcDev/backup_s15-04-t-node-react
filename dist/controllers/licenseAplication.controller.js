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
const licenseAplication_services_1 = __importDefault(require("../services/licenseAplication.services"));
const constants_1 = require("../utils/constants");
class LicenseApplicationController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body, user } = req;
                const response = yield licenseAplication_services_1.default.createLicense(body, user);
                res
                    .status(constants_1.CODE.CREATED)
                    .json({ data: response, message: "Solicitud Creada Correctamente" });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getLicenses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield licenseAplication_services_1.default.getAllLicenses();
                res.status(constants_1.CODE.OK).json({ data: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getMyLicenses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const response = yield licenseAplication_services_1.default.getMyLicenses(user);
                res.status(constants_1.CODE.OK).json({ data: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getLicense = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(constants_1.CODE.BAD_REQUEST).json({ error: "ID is required" });
                }
                const response = yield licenseAplication_services_1.default.getLicense(id);
                if (!response) {
                    return res
                        .status(constants_1.CODE.NOT_FOUND)
                        .json({ error: "Solicitud licencia no encontrada" });
                }
                res.status(constants_1.CODE.OK).json({ data: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.updateLicense = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                if (!id) {
                    return res.status(constants_1.CODE.BAD_REQUEST).json({ error: "ID is required" });
                }
                const response = yield licenseAplication_services_1.default.updateLicense(id, body);
                res.status(constants_1.CODE.OK).json({ data: response });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
    }
}
exports.default = new LicenseApplicationController();
