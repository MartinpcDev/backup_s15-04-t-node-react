"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const constants_1 = require("./utils/constants");
server_1.default.listen(constants_1.PORT, () => {
    console.log(`API corriendo Correctamente en http://localhost:${constants_1.PORT}/api/v1`);
});
