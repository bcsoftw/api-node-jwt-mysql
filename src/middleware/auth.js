const jwt = require('jsonwebtoken');
const ResponseTrait = require('../traits/ResponseTrait');

const responseTrait = new ResponseTrait();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return responseTrait.responseError(res, null, 'Access denied', 401); 

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {

        if (err.name === 'TokenExpiredError') {
            responseTrait.responseError(res, null, 'Token expired, please logged in again', 401);
        }

        if (err.name === 'JsonWebTokenError') {
            // Token inválido (manipulado o mal firmado)
            responseTrait.responseError(res, null, 'Invalid token', 400);
        }


        responseTrait.responseError(res, null, 'Internal server error', 500);

    }
};

module.exports = verifyToken;