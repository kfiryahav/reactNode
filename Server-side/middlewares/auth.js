const jwt = require('jsonwebtoken');
const { user_model } = require('../models/user_model');

// check to token
const auth_token = (req, res, next) => {
    // token validation
    let valid_token = req.header('x-auth-token');
    if (!valid_token) {
        return res.status(401).json({ message: 'You need to send a token first' });
    }

    try {
        // token verification
        let decode_token = jwt.verify(valid_token, 'secretKey');
        req.token_data = decode_token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
}

// checks if the use business before action
const check_if_bussiness = async (req, res, next) => {
    try {
        let user = await user_model.findOne({ _id: req.token_data._id, bussiness: true });
        if (!user) {
            return res.status(401).json({ message: 'You must have a bussiness account1' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'You must have a bussiness account' });
    }
}

module.exports = {
    auth_token,
    check_if_bussiness
}