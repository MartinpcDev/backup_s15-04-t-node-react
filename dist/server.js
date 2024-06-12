"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.disable('x-powered-by');
const hourlyEvent = () => {
    console.log('Hourly event executed');
};
node_cron_1.default.schedule('0 * * * *', hourlyEvent);
//Conectar a Database
(0, database_1.connect)();
app.use('/api/v1', routes_1.default);
exports.default = app;
