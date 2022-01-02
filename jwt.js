const jwt = require('jsonwebtoken');
const secretKey = 'kdjfsdkjf43598d';

function createToken(user) {
    return jwt.sign({ user: user }, secretKey, { expiresIn: '8h' });
}

const authJWT = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            var decoded = jwt.verify(token, secretKey);
            next()
        } catch (error) {
            response.sendStatus(401);
            return
        }
    }else{        
        response.sendStatus(401)
    }
}

module.exports = { createToken, authJWT }