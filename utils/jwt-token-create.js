import jwt from "jsonwebtoken"

export function createJwtToken(id) {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "7d",
    });
}