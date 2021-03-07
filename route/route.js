let USER = require('./rtUser');

exports.assignRoutes = (app)=>{
    app.use('/user',USER.ROUTER);
}
