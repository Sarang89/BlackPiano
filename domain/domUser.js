const BCRYPT = require('bcrypt');
const USER = require('../db/dbUser');
const SALT_ROUNDS = 10;



exports.createUser = async (data)=>{
    try {
        data.Password = await BCRYPT.hash(data.Password, SALT_ROUNDS);
        let result = await USER.createUser(data);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fetchUser = async (data) =>{
    try {
        let result = await USER.fetchUser(data.Email);
        if(!result.length){
            let error = {};
            error.code = 1;
            error.message = "Requested user  does not exist!";
            throw error;
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.loginUser = async (data) =>{
    try {
        // data.Password = await BCRYPT.hash(data.Password, SALT_ROUNDS);
        let result = await USER.loginUser(data);
        if (!result) {
            let error = {};
            error.message = "Requested user  does not exist!";
            throw error;
        }
        let is_valid = await BCRYPT.compare(data.Password, result.Password);
        if (!is_valid)
            throw "Invalid Credentials";
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}