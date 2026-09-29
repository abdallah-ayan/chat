import jwt from "jsonwebtoken"
export default function getToken(payload) {
    return jwt.sign(payload , process.env.TOKEN_KEY , {expiresIn : process.env.TOKEN_EXPAIRE} )
}