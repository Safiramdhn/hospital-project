const {verifyToken} = require('../helpers/token')

const authMiddleware = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (auth) {
        const token = auth.split("Bearer ")[1];

        const decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
}

module.exports = authMiddleware;