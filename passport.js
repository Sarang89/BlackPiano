const PASSPORT = require('passport');
const PASSPORT_JWT = require('passport-jwt');
const STRATEGY = PASSPORT_JWT.Strategy;

const EXTRACT_JWT = PASSPORT_JWT.ExtractJwt;
// const USER = require()

PASSPORT.use(new STRATEGY({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secret: process.env.JWT_SECRET
}),
(payload, done)=>{
    
})
