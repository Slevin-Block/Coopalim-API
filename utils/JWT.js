import jwt from "jsonwebtoken";

/**
 * Function which gererate JWT
 * @param {object} payload Object with user informations
 * @param {string} type access or refresh
 * @returns JWT
 */
export const generateToken = (payload, type) => {
    let token;
    !!(type === 'access') && (token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn : `${process.env.ACCESS_TOKEN_DURATION}h`}));
    !!(type === 'refresh') && (token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn : `${process.env.REFRESH_TOKEN_DURATION}d`}));
    return token
}

/**
 * Function which clean array of Refresh Tokens to remove expired tokens and previous used Refresh Token
 * @param {array} tokensArray Array of currents refreshToken to clean
 * @param {string} secret Secret to decrypt token 
 * @param {string} oldToken Previous refreshToken to remove from tokensArray
 * @returns {array} tokensArray cleaned of expired tokens and possibly previous token
 */
export const cleanTokenFamily = (tokensArray = [], secret, oldToken) => {
    const array = [];
    if (tokensArray.length){
        for (let token of tokensArray){
            try{
                jwt.verify(token, secret);
                token !== oldToken && array.push(token);
            }catch (err){
                console.log(err?.name, err?.expiredAt);
            }
        }
    }
    return array;
}