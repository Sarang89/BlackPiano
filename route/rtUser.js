const USER = require('../presentation/presUser');
const ROUTER = require('express').Router();
const UNPROTECTED_ROUTER = require('express').Router();
const MIDDLEWARE = require('./middleware');
const PASSPORT = require('passport');
ROUTER.post("*", require('./middleware').checkBody);
UNPROTECTED_ROUTER.post("*", require('./middleware').checkBody);

UNPROTECTED_ROUTER.post("/login", loginUser);
ROUTER.use("/",PASSPORT.authenticate('jwt', {session: false}));

ROUTER.post("/", createUser);
ROUTER.get("/", fetchUser);
ROUTER.delete("/", removeUser);

async function createUser (req, res){
    try {
        req.body.user = req.user_details.email;
        let result = await USER.createUser(req.body);
        res.send(result);
    } catch (error) {
        MIDDLEWARE.handleReponseError(res, error, "Could Not Register User!");
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

async function removeUser(req, res){
    try {
        let params = req.query;
        let result = await USER.removeUser(params);
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
    ROUTER,
    UNPROTECTED_ROUTER
}