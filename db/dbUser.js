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
        .select('-Password -_id -__v')
        ;
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
        return result[0]._doc;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.removeUser = async(obj) =>{
    try {
        let result = await USER_SCHEMA.deleteOne({
            Email: obj,
        })
        ;
        return result.deletedCount;
    } catch (error) {
        console.log(error);
        throw error;
    }
}