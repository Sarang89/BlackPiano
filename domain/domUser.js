const BCRYPT = require('bcrypt');
const USER = require('../db/dbUser');
const SALT_ROUNDS = 10;
const JWT = require('jsonwebtoken');

const USER_STATUS = {
    active: "Active",
    inactive: "Inactive"
}

function createJwtToken(user){
    return JWT.sign({
        iss: 'BlackPiano_Sample',
        sub: user.Email,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWT_SECRET);
}

/**
 * Creates a user account object for database and performs a check to see if account already exists.
 * @param {Object} user_details - The new-user account details
 * @return {Object} result - THe created account details
 */
exports.createUser = async (user_details)=>{
    try {
        let existing_user = await USER.fetchUser(user_details.Email);
        if (existing_user.length) {
            let error = {};
            error.code = 1;
            error.message = "User Already Exists!";
            throw error;
        }
        user_details.Password = await BCRYPT.hash(user_details.Password, SALT_ROUNDS);
        user_details.CreatedAt = new Date().getTime();
        user_details.CreatedBy = user_details.User;
        user_details.Status = USER_STATUS.active;
        let result = await USER.createUser(user_details);
       
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * gets a user account object from database
 * @param {Object} user_details - The user account details
 * @return {Object} result - The filtered-account details
 */

exports.fetchUser = async (user_details) =>{
    try {
        let result = await USER.fetchUser(user_details.Email);
        if(!result.length){
            let error = {};
            error.code = 1;
            error.message = "Requested user does not exist!";
            throw error;
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Performs User login and checks if the user is active. Hashed password is verified. 
 * @param {Object} user_details - The user account details
 * @return {Object} result - The logged in user account details along with JWT token
 */

exports.loginUser = async (user_details) =>{
    try {
        let result = await USER.loginUser(user_details);
        if (!result) {
            let error = {};
            error.message = "Requested user  does not exist!";
            throw error;
        }
        if(result.Status === 'Inactive'){
            let error = {};
            error.code = 1;
            error.message = "User Inactive, Please Register To Continue.";
            throw error;
        }
        let is_valid = await BCRYPT.compare(user_details.Password, result.Password);
        if (!is_valid)
            throw "Invalid Credentials";
        result.Token = createJwtToken(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Removes User Record from Database  
 * @param {Object} user_details - The user account details
 * @return {Object} result - Confirmation whether the record is deleted
 */
exports.removeUserHard = async(user_details) =>{
    try {
        let result = await USER.fetchUser(user_details.Email);
        if(!result.length){
            let error = {};
            error.code = 1;
            error.message = "Requested user does not exist!";
            throw error;
        }
        result = await USER.removeUser(user_details.Email)
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}