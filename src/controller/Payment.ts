//initialize transaction
import { Request, Response, NextFunction } from 'express'
import https from 'https'
import dotenv from 'dotenv';
import { resolve } from 'path';
import { rejects } from 'assert';
import request from 'request';
import _ from 'lodash';
import payment from '../utils/payment'
import { Object } from 'paystack';
import { error } from 'console';
import Payment from '../model/payment';
dotenv.config();

// const { initializePayment, verifyPayment } = payment(request);

// let APIKEY = process.env.PAYSTACK_PUBLIC_KEY;
// const environment = process.env.NODE_ENV;

// const paystack = new PayStack(APIKEY, environment);

// export const paymentPromise = paystack.initializeTransaction({
//     reference: 'jkl',
//     amount: 2000 *100,
//     email: 'hjj',
//     subaccount: 'acctsk'
// });


// export const verifyPayment = paystack.verifyTransaction({
//     reference: 'hjksl'
// });

export const makePayment = async(req: Request, res: Response) => {
    try {
        console.log(req.query)
        const { name, email, amount } = req.query;

  if(!name || !email || !amount){
    res.status(400).send('please add all fields')
  }

const params = JSON.stringify({
  email,
  amount: typeof amount ==='number' ? amount * 100 : amount
})

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/initialize',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
}

const paystackReq = https.request(options, resp => {
  let data = ''

  resp.on('data', (chunk) => {
    data += chunk
  });

  resp.on('end', () => {
    // const message = 'payment successful';
    // const name = req.query.name
    
    const response = JSON.parse(data)
    res.json(response)
    console.log(JSON.parse(data))
    
  })
}).on('error', error => {
  console.error(error)
})

paystackReq.write(params)
paystackReq.end()

    } catch (error) {
        console.log('error occured! ', error)
    }
}


export const verifyPayment = async(req: Request, res: Response) => {

  try {
    console.log(req.query)
    const { reference } = req.query;


const options = {
hostname: 'api.paystack.co',
port: 443,
path: `/transaction/verify/${reference}`,
method: 'GET',
headers: {
Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
}
}

const paystackReq = https.request(options, resp => {
let data = ''

resp.on('data', (chunk) => {
data += chunk
});

resp.on('end', () => {

const response = JSON.parse(data)
res.json(response)
console.log(JSON.parse(data))

})
}).on('error', error => {
console.error(error)
})

} catch (error) {
    console.log('error occured! ', error)
}

}

// class PaymentOption {
//     startPayment(data: object){
//       return new Promise( async(resolve, rejects) => {
//         try {
//           const form = _.pick(data, ['name', 'email', 'amount' ])
          
//           form.metadata = {
//             name: form.name
//           };

//           form.amount *= 100;

//           initializePayment(form, (error, body: string) => {
//               if(error){
//                 console.log('unable to make payment: ',error)
//               }

//               const response = JSON.parse(body);

//               return resolve(response);

//           })

//         } catch (error) {
//           return rejects(error)
//         }
//       })
//     };

//     verifyPayment(ref: string){
//       if(ref === null){
//         return
//         // return rejects({code: 400, msg: 'reference number not found'})
//       }
//       return new Promise( async(resolve, rejects) => {
//         try {
//           // verify
//           verifyPayment(ref, async(error, body) => {
//             if(error){
//               return rejects(error)
//             }

//             const response = JSON.parse(body)

//             const { reference, status, amount } = response.data;
//             const { email }= response.data.customer;
//             const name = response.data.metadata.name;
//             console.log(reference, status, amount, email, name);
//             const newPayment = await new Payment({reference, status, amount, email, name}).save()
//             console.log('newpayment: ', newPayment);
//             return resolve(newPayment)
//           })
//           // save to mongodb
//         } catch (error) {
//           return rejects(error)
//         }
//       })
//     };

//     printReceipt(ref: string){
//       return new Promise( async (resolve, rejects) => {
//         try {
//           const receipt = Payment.findOne({ reference: ref})
//           if(!receipt){
//             return rejects({ msg: 'no receipt found'})
//           }
//           return resolve(receipt)
//         } catch (error) {
//           return rejects(error)
          
//         }
//       })
//     }
// }