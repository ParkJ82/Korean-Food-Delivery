import pkg from "jsonwebtoken";
const { sign } = pkg;
import * as dotenv from "dotenv";
dotenv.config();


// Generates token using the account id
// Parameters: account_id: id of account
// Return: token using current user_id
function jwtGenerator(account_id) {
    const payload = {
        user: account_id
    };
    return sign(payload, process.env.jwtSecret, {expiresIn: "1hr" });
}



export default jwtGenerator;