import express, { Request, Response, NextFunction, Router } from 'express'
import { makePayment } from '../controller/Payment';

const paymentRouter: Router = express.Router();

paymentRouter.get('/payment', makePayment)

export default paymentRouter