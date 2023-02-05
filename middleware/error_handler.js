const response = require("../config/response")

const errorHandler = (err, req, res, next) => {   
    console.log(err);
 
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.json(response(true, {
        message: errMsg,
        stack: err.stack
    }));
   
}

module.exports = errorHandler