let USER = require('./rtUser');
let PAGE = require('./rtPage');

exports.assignRoutes = (app)=>{
    app.use('/user', USER.UNPROTECTED_ROUTER);
    app.use('/user',USER.ROUTER);
    app.use('/page', PAGE.ROUTER);
}
