// CLEANED

import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// Checks if User is Authorized With Token
// Parameters: req: {body: {jwt_token: value of token}}
// Return: {user: account_id}
export default function authorization (req, res, next) {
    const token = req.body.jwt_token;
    if (!token) {
        return res.status(403).json({ msg: "authorization denied"});
    }
    try {

        // Get Payload (parameters: {user: account_id})
        const payload = jwt.verify(token, process.env.jwtSecret);

        // Set account_id to req.user
        req.user = payload.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"})
    }
}