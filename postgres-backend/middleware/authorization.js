import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default function authorization (req, res, next) {
    const token = req.header("jwt_token");
    try {

        if (!token) {
            return res.status(403).json({ msg: "authorization denied"});
        }

        const payload = jwt.verify(token, process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"})
    }
}