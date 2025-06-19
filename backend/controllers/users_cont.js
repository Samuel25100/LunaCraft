const Users = require("../models/users_db");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid");

class Users_cont {
    
    static async create_acc(req, res) {
        const { name, email, pwd} = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            res.status(403).json({"message": "Account already exist"});
            return;
        }
        if (name == null) {
            res.status(400).json({"message": "Name is missing"});
            return;
        }
        if (email == null) {
            res.status(400).json({"message": "Email is missing"});
            return;
        }
        if (pwd == null) {
            res.status(400).json({"message": "Password is missing"});
            return;
        }
        const userId = uuidv4.v4().toString();
        /* JWT token */
        const accessToken = jwt.sign({ userId },
            process.env.ACCESS_TOKEN, { expiresIn: '1d'});

        const refreshToken = jwt.sign({ userId },
            process.env.REFRESH_TOKEN, { expiresIn: '7d'});
        
        const result = Users.create({ name, email, pwd, userId});
        res.status(201).json({ "message": "Success", "user": { userId, email, name }, accessToken, refreshToken });
    }

    static async login(req, res) {
        const { email, pwd } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            if( user.pwd != pwd) {
                res.status(401).json({ message: "Wrong email or password" });
                return;
            }
            const accessToken = jwt.sign({ userId: user.userId}, process.env.ACCESS_TOKEN, { expiresIn: '1d'});
            const refreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_TOKEN, { expiresIn: '7d'});
            res.status(200).json({ accessToken, refreshToken });
            return;   
        }
        res.status(401).json({ message: "Wrong email or password" });
        return;
    }
}

module.exports = Users_cont;