import pkg from "jsonwebtoken";
const { sign } = pkg;
import * as dotenv from "dotenv";
dotenv.config();

function jwtGenerator(account_id) {
    const payload = {
        user: account_id
    };


    return sign(payload, process.env.jwtSecret, {expiresIn: "1hr" });
}

export default jwtGenerator;