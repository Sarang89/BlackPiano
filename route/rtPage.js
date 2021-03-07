const PAGE = require('../presentation/presPage');
const ROUTER = require('express').Router();
const MIDDLEWARE = require('./middleware');
const PASSPORT = require('passport');
const { removePageHard } = require('../domain/domPage');
ROUTER.post("*", require('./middleware').checkBody);

ROUTER.use("/",PASSPORT.authenticate('jwt', {session: false}));

ROUTER.post("/", createPage);
ROUTER.get("/", fetchPage);
ROUTER.delete("/", removePage);

async function createPage (req, res){
    try {
        req.body.user = req.user_details.email;
        let result = await PAGE.createPage(req.body);
        res.send(result);
    } catch (error) {
        MIDDLEWARE.handleReponseError(res, error, "Could Not Create Page!");
    }
}

async function fetchPage(req, res){
    try {
        let params = req.query;
        let result = await PAGE.fetchPage(params);
        res.send(result);
    } catch (error) {
        res.status(400);
        if(!error.code)
            res.send("Could not fetch the User!");
        else
            res.send(error.message);
    }
}

async function removePage(req, res){
    try {
        let params = req.query;
        let result = await PAGE.removePage(params);
        res.send(result);
    } catch (error) {
        res.status(400);
        if(!error.code)
            res.send("Could not fetch the Page!");
        else
            res.send(error.message);
    }
}

module.exports = {
    ROUTER
}