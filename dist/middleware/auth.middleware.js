"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const protect = (req, res, next) => {
    var _a;
    let token;
    try {
        const headerToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        // token = jwt.verify(headerToken, `${process.env.JWT_SECRET}`)
    }
    catch (error) {
    }
};
exports.protect = protect;
