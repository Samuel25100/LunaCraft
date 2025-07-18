const mongoose = require("mongoose");
const productsh = new mongoose.Schema({
    "prodId": { type: String, required: true},
    "userId": { type: String, required: true},
    "name": { type: String, required: true},
    "description": { type: String },
    "price": { type: Number, required: true},
    "category": { type: String, required: true},
    "material": { type: String },
    "image": { type: String },
    "stock": { type: Number, required: true}
});

const Products = mongoose.model("Products", productsh);
module.exports = Products;