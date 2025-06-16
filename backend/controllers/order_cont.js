const Users = require("../models/users_db");
const Orders = require("../models/order_db");
const Products = require("../models/products_db");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid");

class Order {

    static async add_order(req, res){
        const userId = req.userId;
        const { items, total, status } = req.body;
        if (items && total && status) {
            res.status(401).json({"message": "Missing information"});
        }
        try {
            const orderId = uuidv4.v4();
            const product = await Orders.create({ 
                orderId,
                "customerId": userId, 
                items, total, status
            });
            res.status(201).json({"message": "success", product});
            return;
        } catch(err) {
            console.error("Error in adding order:", err);
            res.status(401);
            return;
        }
    }

    static async cancle_order(req, res) {
        const orderId = req.params.orderId;
        const order = await Orders.findOne({orderId});
        if (!order) {
            res.status(404).json({"message": "Order not found"});
            return;
        }
        try {
            const userId = req.userId;
            if (userId === order.customerId) {
                if (order.status === "pending") {
                    await Orders.deleteOne({customerId});
                    res.status(201).json({"message": "Success"});
                    return;
                }
                res.status(409).json({"message": "Can't cancle order with status is not 'pending'"});
                return;    
            } 
            res.status(409).json({"message": "Not authorize to cancle"});
            return;
        } catch (err) {
            console.err("Error in deleting order: ", err);
            res.status(409).json({"message": "Error in cancling order"});
            return;
        }
    }

    static async update_status(req, res) {
        const { orderId, status} = req.body;
        const order = await Orders.findOne({orderId});
        if (!order) {
            res.status(404).json({"message": "Order not found"});
            return;
        }
        try {
            const status_typ = ['pending', 'shipped', 'delivered'];
            if (status_typ.indexOf(status) !== -1 ) {
                await Order.findByIdAndUpdate(orderId, { status });
                res.status(201).json({"message": "Status updated to ",status});
                return;
            }
            res.status(409).json({"message": "Adding not allowed status value"});
            return;
        }  catch(err) {
            console.log("Error in updating order status:", err);
            return res.status(409);
        }
    }

    static async check_status(req, res) {
        const orderId = req.params.orderId;
        const order = await Orders.findOne({orderId});
        if (!order) {
            res.status(404).json({"message": "Order not found"});
            return;
        }
        try {
            const userId = req.userId;
            if (userId === order.customerId) {
                res.status(200).json({ "status": order.status });
                return;
            }
            res.status(409).json({"message": "Not authorize to check status"});
            return;
        } catch(err) {
            console.log("Error in checking order status:", err);
            return res.status(409);
        }
    }
}