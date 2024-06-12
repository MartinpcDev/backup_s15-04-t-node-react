"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE = exports.CODE = exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = Number(process.env.PORT) || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET || "";
var CODE;
(function (CODE) {
    CODE[CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    CODE[CODE["NOT_FOUND"] = 404] = "NOT_FOUND";
    CODE[CODE["CREATED"] = 201] = "CREATED";
    CODE[CODE["OK"] = 200] = "OK";
    CODE[CODE["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    CODE[CODE["UNAUTHORIZED_ACCESS"] = 401] = "UNAUTHORIZED_ACCESS";
    CODE[CODE["FORBIDDEN"] = 403] = "FORBIDDEN";
    CODE[CODE["ACCEPTED"] = 202] = "ACCEPTED";
    CODE[CODE["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
})(CODE || (exports.CODE = CODE = {}));
var ROLE;
(function (ROLE) {
    ROLE["USER"] = "USER";
    ROLE["EMPLEADO"] = "EMPLEADO";
    ROLE["ADMIN"] = "ADMIN";
})(ROLE || (exports.ROLE = ROLE = {}));
