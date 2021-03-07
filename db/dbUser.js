let USER_SCHEMA = require('./dbUserModel');
let Mongoose = require('./dbUtil').DB();


exports.createUser = async (obj)=>{
    try {
        let user = USER_SCHEMA(obj);
        let result = await user.save();
        console.log(`Inserted document : ${result}`);
        return result._doc;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fetchUser = async(email) =>{
    try {
        let result = await USER_SCHEMA.find({
            Email: email
        })
        .select('-Password')
        ;
        console.log(`Fetched: ${result.Email}`);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.loginUser = async(obj) =>{
    try {
        let result = await USER_SCHEMA.find({
            Email: obj.Email,
        })
        ;
        console.log(`Fetched: ${result.Email}`);
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}