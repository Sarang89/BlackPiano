const DOTENV = require('dotenv');
let EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const UUID = require('uuid').v4;
DOTENV.config();

let APP = EXPRESS();
APP.use(BODY_PARSER.text());
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({extended: true}));

const ROUTES = require('./route/route');
ROUTES.assignRoutes(APP);

APP.get('/', (req, res)=>{
    const uuid = UUID();
    console.log(`Unique: ${uuid}`);
    res.send('Black Piano  server hit!');
})

let SERVER = APP.listen(process.env.HTTP_PORT, ()=>{
    console.log(`Server Listening on port : ${process.env.HTTP_PORT}`);
})