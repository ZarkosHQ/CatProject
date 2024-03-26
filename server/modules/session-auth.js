const dbo = require("../db/conn");
const { 
    v4: uuidv4
} = require('uuid');

module.exports = {
    verifyToken: async (token) => {
        const tokens = dbo.collection("tokens");
        let t = await tokens.findOne({
            token: token
        });
        return t;
    },
    beginSession: async (user) => {
        const t = uuidv4();
        const tokenCursor = dbo.collection("tokens");
        await tokenCursor.insertOne({
            user: user._id,
            token: t
        });
        return t;
    }
}