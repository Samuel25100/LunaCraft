const jwt = require("jsonwebtoken")

function jwt_auth(req, res, next) {
    const authtoken = req.headers["authorization"].toString();
    const token = authtoken && authtoken.split(' ')[1];

    if (!token){
        res.status(401).json({"message": "Token missing"});
        return;
    }
    console.log("token", token);
    console.log(token == process.env.ACCESS_TOKEN);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            res.status(403).json({"message": "Unathorize token"});
            return;
        }
        req.userId = user.userId;
        next();
    });    
}

module.exports = jwt_auth;