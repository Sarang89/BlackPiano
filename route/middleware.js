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