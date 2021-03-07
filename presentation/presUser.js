let USER = require('../domain/domUser');

exports.createUser = async (body)=>{
    try {
        let obj = {
            Name: body.name,
            Email: body.email,
            Password: body.password,
            User: body.user
        }
        let result = await USER.createUser(obj);
        let returnValue = {
            email: result.Email,
            name: result.Name
        }
        return returnValue;
    } catch (error) {
        throw error;
    }
}

exports.fetchUser = async(body) =>{
    try {
        let obj = {
            Email: body.email
        }
        let result = await USER.fetchUser(obj);
        let returnValue = {
            email: result.Email,
            name: result.Name
        }
        return result;
    } catch (error) {
       throw error;
    }
}

exports.loginUser = async(body) =>{
    try {
        let obj = {
            Email: body.email,
            Password: body.password
        }
        let result = await USER.loginUser(obj);
        let returnValue = {
            email: result.Email,
            name: result.Name,
            token: result.Token
        }
        return returnValue;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.removeUser = async(body) =>{
    try {
        let obj = {
            Email: body.email
        }
        let result = await USER.removeUserHard(obj);
        if(result == 1)
        return "User deleted succesfully!";
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.One = async(body) =>{
    try {
        
    } catch (error) {
        
    }
}