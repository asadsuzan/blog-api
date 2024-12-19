import jwt from 'jsonwebtoken';
import config from '../config';
// generate jwt token with userId and user role
const generateAuthToken = (userId: string, role: string) => {
    if (!config.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the configuration.");
    }
    const token = jwt.sign({ userId, role }, config.JWT_SECRET, { expiresIn: "1D" });
    return token;
}

export default generateAuthToken;