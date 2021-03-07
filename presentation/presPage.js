let PAGE = require('../domain/domPage');

exports.createPage = async (body)=>{
    try {
        let obj = {
            Title: body.title,
            Content: body.content,
            Keywords: body.keywords,
            User: body.user
        }
        let result = await PAGE.createPage(obj);
        let returnValue = {
            title: result.Title,
        }
        return returnValue;
    } catch (error) {
        throw error;
    }
}

exports.fetchPage = async(body) =>{
    try {
        let obj = {
            Title: body.title
        }
        let result = await PAGE.fetchPage(obj);
        result = result[0];
        let returnValue = {
            title: result.Title,
            content: result.Content,
            keywords: result.Keywords,
            createdby:{
                Email: result.User[0].Email, 
                Name: result.User[0].Name,
            } 
        }
        return returnValue;
    } catch (error) {
       throw error;
    }
}

exports.removePage = async(body) =>{
    try {
        let obj = {
            Title: body.title
        }
        let result = await PAGE.removePageHard(obj);
        if(result == 1)
        return "Page removed succesfully!";
    } catch (error) {
        console.log(error);
        throw error;
    }
}
