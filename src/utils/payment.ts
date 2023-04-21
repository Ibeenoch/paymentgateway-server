import { error } from 'console';
import request from 'request';

interface IForm {
    name: string;
    email: string;
    amount: number;
    reference: string;
}

const payments = (request: any) => {
    const SECRET = process.env.PAYSTACK_SECRET_KEY;
    const secretKey = `Bearer ${SECRET}`

    const initializePayment = (form: IForm, mycallback: ( error: unknown, body: string) => unknown)=> {
        const option = {
            url : 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: secretKey,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            },
            form
        };
        const callback = (error: unknown, response: unknown, body:string) => {
           console.log(typeof error, typeof body, typeof response)
            return mycallback(error, body);
        }

        request.post(option, callback)
    } ;
    const verifyPayment = (ref: string, mycallback: ( error: unknown, body:string) => unknown) => {
        const option= {
            url: 'https/api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers: {
                Authorization: secretKey,
                'Content-type': 'application/json',
                'cache-control': 'no-cache',
            },
            ref,
        };

         const callback = (error: unknown, response: unknown, body:string) => {
            return mycallback(error, body);
        }

        request(option, callback)
    }

    return { initializePayment, verifyPayment}
}

export default payments