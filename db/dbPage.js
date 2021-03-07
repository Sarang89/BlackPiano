let PAGE_SCHEMA = require('./dbPageModel');
let Mongoose = require('./dbUtil').DB();


exports.createPage = async (obj)=>{
    try {
        let page = PAGE_SCHEMA(obj);
        let result = await page.save();
        console.log(`Inserted document : ${result}`);
        return result._doc;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fetchPage = async(title) =>{
    try {
        // let result = await PAGE_SCHEMA.find({
        //     Title: title
        // })
        // .select('-_id -__v')
        // ;
        let result = await PAGE_SCHEMA.aggregate([
            {
                '$match': {
                    'Title': title
                }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'CreatedBy',
                    'foreignField': 'Email',
                    'as': 'User'
                }
            }
        ]);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.removePage = async(obj) =>{
    try {
        let result = await PAGE_SCHEMA.deleteOne({
            Title: obj,
        })
        ;
        return result.deletedCount;
    } catch (error) {
        console.log(error);
        throw error;
    }
}