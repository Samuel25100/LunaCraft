const Products_con = require("../controllers/product_cont");
const express = require("express");
const jwt_auth = require("../middlewares/jwt_auth");

const router = express.Router();

router.get('/:id', jwt_auth, Products_con.get_product);
router.get('/get/', jwt_auth, Products_con.get_allProd)
router.post('/add', jwt_auth, Products_con.add_product);
router.put('/:id', jwt_auth, Products_con.update_prod);
router.delete('/:id', jwt_auth, Products_con.delete_prod);

module.exports = router;