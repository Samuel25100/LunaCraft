const order_cont = require("../controllers/order_cont");
const express = require("express");
const jwt_auth = require("../middlewares/jwt_auth");

const router = express.Router();

router.post("/add", jwt_auth, order_cont.add_order);
router.get("/:id", jwt_auth, order_cont.get_orders);
router.delete("/cancle/:id", jwt_auth, order_cont.cancle_order);
router.patch("/status", jwt_auth, order_cont.update_status);
router.get("/status/:id", jwt_auth, order_cont.check_status);


module.exports = router;