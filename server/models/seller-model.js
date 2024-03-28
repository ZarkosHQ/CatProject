const {Schema, model} = require("../config/db/conn");

const sellerSchema = new Schema({
    subtype: String,
    businessId: String,
    businessName: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

module.exports = sellerSchema;