const dbo = require("../db/conn");

module.exports = async (token) => {
    const tokens = dbo.collection("tokens");
    let t = await tokens.findOne({
        token: token
    });
    return t;
}