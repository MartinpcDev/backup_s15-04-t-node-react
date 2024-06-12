"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const HttpException_1 = require("./HttpException");
const constants_1 = require("./constants");
const errorMessage = (res, error) => {
    if (error instanceof HttpException_1.HttpException) {
        res.status(error.status).json({ message: error.message });
    }
    else {
        console.log(error);
        res.status(constants_1.CODE.INTERNAL_SERVER_ERROR).json({ message: "Hubo un error" });
    }
};
exports.errorMessage = errorMessage;
