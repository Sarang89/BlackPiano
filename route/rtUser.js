const USER = require('../presentation/presUser');
const ROUTER = require('express').Router();
const MIDDLEWARE = require('./middleware');
ROUTER.post("*", require('./middleware').checkBody);

ROUTER.post("/", createUser);
ROUTER.get("/", fetchUser);
ROUTER.post("/login", loginUser);

async function createUser (req, res){
    try {
        let result = await USER.createUser(req.body);
        res.send(result);
    } catch (error) {
        res.status(400).send("Could not create the User!");
    }
}

async function fetchUser(req, res){
    try {
        let params = req.query;
        let result = await USER.fetchUser(params);
        res.send(result);
    } catch (error) {
        res.status(400);
        if(!error.code)
            res.send("Could not fetch the User!");
        else
            res.send(error.message);
    }
}

async function loginUser(req, res){
    try {
        let result = await USER.loginUser(req.body);
        res.send(result);
    } catch (error) {
        MIDDLEWARE.handleReponseError(res, error, "Invalid Credentials!");
    }
}

module.exports = {
    ROUTER
}