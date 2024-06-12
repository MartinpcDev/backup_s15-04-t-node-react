"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleInputErrors = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../utils/constants");
const HandleInputErrors = (req, res, next) => {
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(constants_1.CODE.BAD_REQUEST).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.HandleInputErrors = HandleInputErrors;
