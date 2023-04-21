import express, { Express, Router } from "express";
import { login, register, users } from "../controller/user.controller";

const route: Router = express.Router();

route.post('/create', register);
route.post('/login', login);
route.get('/users', users)

export default route;