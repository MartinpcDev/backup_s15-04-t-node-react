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
const user_service_1 = __importDefault(require("../services/user.service"));
const constants_1 = require("../utils/constants");
class UserController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const response = yield user_service_1.default.createUser(body);
                res
                    .status(constants_1.CODE.CREATED)
                    .json({ data: response, message: 'Usuario Creado Correctamente' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const token = yield user_service_1.default.login(body);
                res
                    .status(constants_1.CODE.ACCEPTED)
                    .json({ token, message: 'Logeado Correctamente' });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.getSession = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const user = yield user_service_1.default.getById(id);
                res.status(constants_1.CODE.OK).json(user);
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                const updatedUser = yield user_service_1.default.update(id, body);
                res
                    .status(constants_1.CODE.ACCEPTED)
                    .json({
                    data: updatedUser,
                    message: 'Usuario Actualizado correctamente'
                });
            }
            catch (error) {
                (0, HandleError_1.errorMessage)(res, error);
            }
        });
    }
}
exports.default = new UserController();
