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
exports.verifyToken = exports.generateJwt = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("./constants");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcrypt_1.genSalt)(10);
    return yield (0, bcrypt_1.hash)(password, salt);
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.compare)(password, hashPassword);
});
exports.comparePassword = comparePassword;
const generateJwt = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, constants_1.JWT_SECRET, { expiresIn: "1d" });
};
exports.generateJwt = generateJwt;
const verifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, constants_1.JWT_SECRET);
};
exports.verifyToken = verifyToken;
