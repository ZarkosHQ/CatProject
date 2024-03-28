const {Schema, model} = require("../config/db/conn");

const buyerSchema = new Schema({
    subtype: String,
    experience: String,
    interests: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

module.exports = buyerSchema;