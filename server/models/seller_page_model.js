//Create seller schema 
const sellerSchema = new mongoose.Schema({
    seller_picture: { type: Object, required: false },
    seller_name: { type: String, required: true },
    seller_website: { type: String, required: false },
    seller_email: { type: String, required: true, unique: true },
    seller_phoneNumber: { type: String, required: true },
    seller_address: { type: String, required: false },
    seller_summary: { type: String, required: true },
    seller_partners: { type: Array, required: true},
    userType: { type: String, default: "Seller" }
}); 

//Thank you guys : )