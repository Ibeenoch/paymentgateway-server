"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../model/user.model"));
const token_model_1 = __importDefault(require("../model/token.model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: '2d',
    });
};
const sendMail = (email, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });
    let info = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject,
        text,
    };
    transporter.sendMail(info, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('info message: ', res);
        }
    });
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).send('please add all fields');
        }
        const userExist = yield user_model_1.default.findOne({ email });
        if (!userExist) {
            res.status(400).json({ message: "User Already exist" });
        }
        // hash the password
        const salt = 10;
        const gensalt = bcryptjs_1.default.genSaltSync(salt);
        const hashPassword = bcryptjs_1.default.hashSync(password, gensalt);
        // create a new user
        const user = new user_model_1.default({
            name,
            email,
            password,
        });
        // save the user in the db
        yield user.save();
        const _id = user._id;
        const token = generateToken(_id);
        // create the user token
        yield new token_model_1.default({
            userId: _id,
            token,
        }).save();
        // send an email verfication to the user+
        const subject = "Email Verfication";
        const url = 'http://localhost:3000/welcome';
        const link = `${url}/emailverification?token=${token}&id=${_id}`;
        const text = `Thank You for signing up to Deezy Space, click the link below to confirm your email address and get started /n ${link}`;
        sendMail(req.body.email, subject, text);
        res.status(201).json({
            name: user.name,
            email: user.email,
            password: user.password,
            message: 'a confirmation link has been send to your email, check your email to continue',
            token,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the user fields
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send('please include all fields');
        }
        // check if the user exist
        const userExist = yield user_model_1.default.findOne({ email });
        if (!userExist) {
            res.status(400).send('User does not exist');
        }
        if (userExist) {
            // check if user password is correct
            const comparePassword = yield bcryptjs_1.default.compare(password, userExist.password);
            if (!comparePassword) {
                res.status(400).send('Incorrect Password!');
            }
            if (comparePassword) {
                // delete previous token
                const userId = userExist._id;
                const token = yield token_model_1.default.findOne({ userId });
                if (token) {
                    yield token.deleteOne();
                }
                // create a new token
                const newtoken = generateToken(userExist._id);
                yield new token_model_1.default({
                    userId: userExist._id,
                    token: newtoken
                }).save();
                res.status(200).json({
                    email: userExist.email,
                    name: userExist.name,
                    token: newtoken,
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.find();
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.users = users;
