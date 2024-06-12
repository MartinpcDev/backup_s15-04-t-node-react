"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user.router"));
const company_router_1 = __importDefault(require("./company.router"));
const cargo_router_1 = __importDefault(require("./cargo.router"));
const licenseAplication_router_1 = __importDefault(require("./licenseAplication.router"));
const contract_router_1 = __importDefault(require("./contract.router"));
const router = (0, express_1.Router)();
router.use("/users", user_router_1.default);
router.use("/companys", company_router_1.default);
router.use("/cargo", cargo_router_1.default);
router.use("/licenseAplication", licenseAplication_router_1.default);
router.use("/contract", contract_router_1.default);
exports.default = router;
