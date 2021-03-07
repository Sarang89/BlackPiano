const PASSPORT = require('passport');
const PASSPORT_JWT = require('passport-jwt');
const STRATEGY = PASSPORT_JWT.Strategy;

const EXTRACT_JWT = PASSPORT_JWT.ExtractJwt;
const USER = require('./presentation/presUser');

PASSPORT.use(new STRATEGY({
    jwtFromRequest: EXTRACT_JWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
},
async (payload, done)=>{
    try {
        let obj = {
            email: payload.sub
        }
        let user = await USER.fetchUser(obj);
        if(user)
            return done(null, user);  
    } catch (error) {
        return done(error);        
    }
}))
