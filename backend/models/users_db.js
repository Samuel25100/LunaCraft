const mogoose = require("mongoose");

const usersh = new mogoose.Schema(
    {
        "id": { type: String, required: true},
        "name": { type: String, required: true},
        "pwd": { type: String, required: true},
        "email": { type: String, required: true},
        "address": { type: String },
        "orders": [{ type: String }]
    }
);

const Users = mogoose.model("Users", usersh);
module.exports = Users;