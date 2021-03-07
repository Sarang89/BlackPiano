const PAGE = require('../db/dbPage');

/**
 * Creates a page object for database and performs a check to see if title already exists.
 * @param {Object} page_details - The new-user account details
 * @return {Object} result - The created Page details
 */
 exports.createPage = async (page_details)=>{
    try {
        let existing_page = await PAGE.fetchPage(page_details.Title);
        if (existing_page.length) {
            let error = {};
            error.code = 1;
            error.message = "Page Already Exists!";
            throw error;
        }
        page_details.CreatedAt = new Date().getTime();
        page_details.CreatedBy = page_details.User;
        let result = await PAGE.createPage(page_details);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * gets a Page object from database
 * @param {Object} page_details - The Page details
 * @return {Object} result - The Page details
 */
 exports.fetchPage = async (page_details) =>{
    try {
        let result = await PAGE.fetchPage(page_details.Title);
        if(!result.length){
            let error = {};
            error.code = 1;
            error.message = "Requested Page does not exist!";
            throw error;
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Deletes Page Record from Database  
 * @param {Object} page_details - The Page details
 * @return {Object} result - Confirmation whether the record is deleted
 */
 exports.removePageHard = async(page_details) =>{
    try {
        let result = await PAGE.fetchPage(page_details.Title);
        if(!result.length){
            let error = {};
            error.code = 1;
            error.message = "Requested Page does not exist!";
            throw error;
        }
        result = await PAGE.removePage(page_details.Title);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}