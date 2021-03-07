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
        delete result.Password;
        return result;
    } catch (error) {
        res.status(400).send("Could not create the User!");
    }
}

exports.fetchUser = async(body) =>{
    try {
        let obj = {
            Email: body.email
        }
        let result = await USER.fetchUser(obj);
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
        return result;
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