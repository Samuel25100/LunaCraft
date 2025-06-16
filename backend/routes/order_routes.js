const order_cont = require("../controllers/order_cont");
const express = require("express");
const jwt_auth = require("../middlewares/jwt_auth");

const router = express.Router();

router.post("/add", jwt_auth, order_cont.add_order);

module.exports = router;