let USER = require('./rtUser');

exports.assignRoutes = (app)=>{
    app.use('/user', USER.UNPROTECTED_ROUTER);
    app.use('/user',USER.ROUTER);
}
