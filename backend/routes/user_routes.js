const Users = require("../controllers/users_cont");
const express = require("express");

const routes_user = express.Router();

routes_user.post('/signup', Users.create_acc);
routes_user.post('/login', Users.login);

module.exports = routes_user;