function generalResponse(err, data) {
    if(err){
        return {
            "success" : false,
            "data" : null,
            "errmsg" : data
        };
    }else{
        return {
            "success" : true,
            "data" : data,
            "errmsg" : null
        };
    }

}
module.exports = generalResponse;