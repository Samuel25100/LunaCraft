const Products_con = require("../controllers/product_cont");
const express = require("express");

const router = express.Router();

router.get('/:id', Products_con.get_product);
router.post('/add', Products_con.add_product);
router.put('/:id', Products_con.update_prod);
router.delete('/:id', Products_con.delete_prod);

module.exports = router;