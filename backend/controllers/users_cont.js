const Users = require("../models/users_db");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid");

export default class Users {
    
    static async create_acc(req, res) {
        const { name, email, pwd} = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            res.status(409).json({"message": "Account already exist"});
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
        const id = uuidv4.v4().toString();
        /* JWT token */
        const accessToken = jwt.sign({ userId: id},
            process.env.ACCESS_TOKEN, { expiresIn: '15m'});

        const refreshToken = jwt.sign({ userId: id},
            process.env.REFRESH_TOKEN, { expiresIn: '7d'});
        
        const result = Users.create({ name, email, pwd, id});
        res.status(200).json({ accessToken, refreshToken });
    }

    static async login(req, res) {
        const { refreshToken, email, pwd } = req.body;
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        if (decode) {
            const user = Users.findOne({ email });
            if (user == null) {
                res.status(401).json({ message: "Wrong email or password" });
                return;
            }
            if( user.pwd != pwd) {
                res.status(401).json({ message: "Wrong email or password" });
                return;
            }
            const accessToken = jwt.sign({ userId: decode.userId},
                process.env.ACCESS_TOKEN, { expiresIn: '15m'});
            res.status(200).json({ accessToken });
            return;   
        }
        res.status(401).json({"message": "Missing credential"});
        return;
    }
}
