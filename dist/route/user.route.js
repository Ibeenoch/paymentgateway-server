"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const route = express_1.default.Router();
route.post('/user', user_controller_1.register);
route.post('/user', user_controller_1.login);
route.get('/users', user_controller_1.users);
exports.default = route;
