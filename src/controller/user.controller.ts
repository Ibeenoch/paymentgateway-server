import  { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../model/user.model';
import Token from '../model/token.model';
import nodemailer, { createTestAccount } from 'nodemailer'
import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const secret: any = process.env.JWT_SECRET

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign( { id },  secret, {
        expiresIn: '2d',
    })
}

const emailenv: any = process.env.EMAIL
const emailPassword : any = process.env.EMAIL_PASSWORD

const sendMail = async(email: string, subject: string, html: string) => {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter =  nodemailer.createTransport({
       service: 'gmail',
       port: 465,
       secure: true,
       logger: true,
        debug: true,
        auth: {
            user: emailenv,
            pass: emailPassword,
        },
        tls:{
            rejectUnauthorized:true
        },
       
    });

    let info = {
        from: emailenv,
        to: email,
        subject: subject,
        html: html,

    }

    transporter.sendMail(info, (err, res) => {
        if(err) {
            console.log('err: ', err);
        }else {
            console.log('info message sent succesfully')
        }

    })


}

export const register = async( req:Request, res: Response ) => {
try {
    console.log(req.body)
    const { name, email, password } = req.body;
    

    if(!name || !email || !password){
        res.status(400).send('please add all fields')
    }

    if(password.length < 6){
        res.status(400).send('password must be at least 6 characters')
    }

    if(password.length > 12){
        res.status(400).send('password must not exceed 12 characters')
    }
    const userExist = await User.findOne({ email });

    if(userExist){
        res.status(400).send({ message: "User Already exist"})
    }

    // hash the password
    const salt = 10;
    const gensalt = bcrypt.genSaltSync(salt);
    const hashPassword = bcrypt.hashSync(password, gensalt);

    // create a new user
    const user = new User({
        name,
        email,
        password,
    })
    console.log('user: ', user)
// save the user in the db
    await user.save()
    const _id : any = user._id
    const token = generateToken(_id)
// create the user token
    await new Token({
        userId: _id,
        token,
    }).save();


    // send an email verfication to the user+
    const subject: string = "Email Verfication"
    const url: string = 'http://localhost:3000/welcome'
    const link: string = `${url}/emailverification?token=${token}&id=${_id}`;
    const text: string = `Thank You for signing up to Deezy Space, click the link below to confirm your email address and get started /n ${link}`
    const html = `
    <h2>Email Verification</h2>
    <p>Thank You for signing up to Deezy Space, click the link below to confirm your email address and get started /n ${link} </p>
    `;
    sendMail(req.body.email, subject, html ).catch((e) => {
        console.log('error sending mail', e )
    })
   
    res.status(201).json({
        name: user.name,
        email: user.email,
        message: 'a confirmation link has been send to your email, check your email to continue',
        token,
    })

} catch (error) {
    console.log(error)
}
}


export const login = async( req: Request, res: Response) => {
try {
    //get the user fields
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).send('please include all fields');
    }
    // check if the user exist
    const userExist = await User.findOne({email});

    if(!userExist){
        res.status(400).send('User does not exist');
    }

    if(userExist){
        // check if user password is correct
            const comparePassword = await bcrypt.compare( password, userExist.password)
        if(!comparePassword){
            res.status(400).send('Incorrect Password!');
        }

        if(comparePassword){ 
            // delete previous token
             const userId = userExist._id
            
            const token = await Token.findOne({ userId })

            if(token){
                await token.deleteOne();
            }
            // create a new token
            const newtoken = generateToken(userExist._id);

            await new Token({
                userId: userExist._id,
                token: newtoken
            }).save();

            res.status(200).json({
                email: userExist.email,
                name: userExist.name,
                token: newtoken,
            })

        }
    }

} catch (error) {
    console.log(error)
}
}

export const googleSignIn = async(req: Request, res: Response) => {
try {
    console.log(req.body)
    const { email, name, googleId, token } = req.body;

    const userExist = await User.findOne({ googleId });

    if(userExist){
        res.status(200).json({
            email,
            name,
            googleId, 
            token,
        })
    }else{
        const user = await new User({
            name,
            email,
            googleId,
        }).save();

        await new Token({
            userId: user._id,
            token
        }).save();

        res.status(200).json({
            name,
            email,
            googleId,
            token
        })
    }
} catch (error) {
    console.log(error)
}
}

export const users = async( req: Request, res: Response) => {
try {
    const user = await User.find();

    res.status(200).json(user)

} catch (error) {
    console.log(error)
}
}