const JWT_SECRET = 'jwt_secret';
const jwt = require('jsonwebtoken');

const GenerateToken = (id, email) => {
    const key = process.env.JWT_SECRET || JWT_SECRET;
    const token = jwt.sign({id: id, email: email}, key, {expiresIn: "1h"});
    return token;
}

const VerifyToken = (token) => {
    const key = process.env.JWT_SECRET || JWT_SECRET;
    try {
        const decoded = jwt.verify(token, key);
        return decoded;
    } catch (err) {
        return null;
    }
}

module.exports = { GenerateToken, VerifyToken };