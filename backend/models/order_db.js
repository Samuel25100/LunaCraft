const mongoose = require("mongoose");
const ordersh = new mongoose.Schema({
    "orderId": {type: String, required: true},
    "customerId": { type: String, required: true},
    "items": [{
        "prodId": { type: String, required: true}, 
        "quantity": { type: Number, required: true}
    }],
    "total": { type: Number, required: true},
    "status": { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending'}

});
const Orders = mongoose.model("Orders", ordersh);
module.exports = Orders;