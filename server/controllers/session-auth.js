const { 
    v4: uuidv4
} = require('uuid');
const Token = require('../models/token-model');

module.exports = {
    verifyToken: async (token) => {
        let t = await Token.findOne({
            token: token
        });
        return t;
    },
    beginSession: async (user) => {
        const t = uuidv4();
        await Token.create({
            user: user._id,
            token: t
        });
        return t;
    }
}