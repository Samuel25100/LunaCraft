const Users = require("../models/users_db");
const Products = require("../models/products_db");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid");

export default class Products_con {
    
    static async get_product(req, res) {
        const id = req.params.id;
        const prod = Products.findOne({ id });
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
            const id = uuidv4.v4().toString();
            await Products.create({ id, name, description,
                price, category, material, stock, image});
        } catch (err){
            console.error("In adding product: ",err);
        }
    }

    static async update_prod(req, res) {
        const id = req.params.id;
        const nw_info = req.body;
        const prod = await Products.findOne({ id });
        if (prod) {
            try {
                const new_prod = await Products.findByIdAndUpdate(
                    id, { ...nw_info}, {new: true});
                res.status(200).json({ new_prod});
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
                await Products.findByIdAndDelete(id);
                res.status(200).json({"message": "Deleted succesfully"});
                return;
            } catch (err) {
                console.error("Inside delete product:", err);
            }
        }
        res.status(401).json({"message": "Wrong product id"});
    }

    static async get_allProd(req, res) {
        
    }
}