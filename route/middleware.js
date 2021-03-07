exports.checkBody = (req, res, next)=>{
    try {
        if(!Object.keys(req.body).length)
            throw "Request body missing!";
        else
            next();
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.handleReponseError = (res, error, message) =>{
    res.status(400);
    if(!error.code)
        res.send(message)
    else
        res.send(error.message);
}

exports.getUserInfoFromToken = (req, res, next) =>{
    if(req.headers && req.headers.authorization){
        let auth = req.headers.authorization.split(' ')[1];
        let jwt = require('jsonwebtoken');
        let decoded;
        try {
            decoded = jwt.verify(auth, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).send('Unauthorized');
        }
        req.user_details = {
            email: decoded.sub || null
        }
    }
    next();
}