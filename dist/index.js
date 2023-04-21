"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./route/user.route"));
const db_connect_1 = __importDefault(require("./config/db.connect"));
const error_middleware_1 = require("./middleware/error.middleware");
(0, db_connect_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/', user_route_1.default);
app.use(error_middleware_1.errorHandler);
const PORT = `${process.env.PORT}` || 3030;
app.listen(PORT, () => { console.log(`🚀🚀🚀 on port ${PORT}`); });
