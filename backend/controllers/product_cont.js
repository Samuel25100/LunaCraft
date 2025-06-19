const Users = require("../models/users_db");
const Products = require("../models/products_db");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid");

class Products_con {
    
    static async add_product(req, res) {
        const { name, description,
                price, category, 
                material, image, stock} = req.body;
        if (name == null) {
            res.status(401).json({"message": "Product name is missing"})
            return;
        }
        if (price == null) {
            res.status(401).json({"message": "Product price is missing"})
            return;
        }
        if (category == null) {
            res.status(401).json({"message": "Product category is missing"})
            return;
        }
        if (stock == null) {
            res.status(401).json({"message": "Product stock is missing"})
            return;
        }
        try {
            const prodId = uuidv4.v4().toString();
            const userId = req.userId;
            const product = await Products.create({ prodId, userId, name, description,
                price, category, material, stock, image});
            res.status(201).json({"message": "success", product});
            return;
        } catch (err){
            console.error("In adding product: ",err);
        }
    }

    static async get_product(req, res) {
        const prodId = req.params.id;
        const prod = await Products.findOne({ prodId });
        if (prod) {
            res.status(200).json({
                "name": prod.name,
                "description": prod.description,
                "price": prod.price,
                "category": prod.category,
                "material": prod.material,
                "image": prod.image,
                "stock": prod.stock
            });
            return;
        }
        res.status(401).json({"message": "Wrong product id"});
    }

    static async update_prod(req, res) {
        const prodId = req.params.id;
        const nw_info = req.body;
        const prod = await Products.findOne({ prodId });
        if (prod) {
            try {
                const new_prod = await Products.findOneAndUpdate( { prodId } , { $set: {...nw_info}}, {new: true});
                const filtered = {
                    "prodId": new_prod.prodId, 
                    "userId": new_prod.userId,
                    "name": new_prod.name,
                    "description": new_prod.description,
                    "price": new_prod.price,
                    "category": new_prod.category,
                    "material": new_prod.material,
                    "image": new_prod.image,
                    "stock": new_prod.stock,
                }
                res.status(200).json({ ...filtered });
                return;
            } catch (err) {
                console.error("Inside updating product info:", err);
            }
        }
        res.status(401).json({"message": "Wrong product id"});
    }

    static async delete_prod(req, res) {
        const id = req.params.id;
        const nw_info = req.body;
        const prod = await Products.findOne({ id });
        if (prod) {
            try {
                await Products.findOneAndDelete({prodId: id});
                res.status(200).json({"message": "Deleted succesfully"});
                return;
            } catch (err) {
                console.error("Inside delete product:", err);
            }
        }
        res.status(401).json({"message": "Wrong product id"});
    }

    static async get_allProd(req, res) {
        const filter = req.query;
        return;
    }
}

module.exports = Products_con;