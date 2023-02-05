let response = require("../config/response")

/// RULES : email,password,boolean,number,string
/// variables_and_rules : {
/// rule : "email",
/// variable : some_variable,
/// key : "some_variable"
/// }

module.exports.validate = (variables_and_rules) => {
    let errors = []
    variables_and_rules.map((item) => {
  if(item.rule)          {
    if(item.rule && typeof(item.variable) != "undefined" && item.variable != null && item.key){
         
        if (item.rule == "email") {
            let e = validateEmail(item.variable,item.key)
            if(e.length > 0){
                errors.push(e)
            }
        } else if (item.rule == "password") {
            let e = validatePassword(item.variable,item.key)
            if(e.length > 0){
                errors.push(e)
            }
        } else if (item.rule == "boolean") {
            let e = validateBoolean(item.variable,item.key)
            if(e.length > 0){
                errors.push(e)
            }
        } else if (item.rule == "number") {
            let e = validateNumber(item.variable,item.key)
            if(e.length > 0){
                errors.push(e)
            }
        } else if (item.rule == "string") {
            let e = validateString(item.variable,item.key)
            if(e.length > 0){
                errors.push(e)
            }
        }
    }else{
        errors.push(item.key + " is required");
    }
  }
  

    })
    return errors
}

function validateEmail(variable,key) {
    return (variable.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) ? "" : key + " must be email"
}

function validateString(variable,key) {
    return (typeof variable == "string") ? "" : key + " must be string"
}

function validateNumber(variable,key) {
    return (typeof variable == "number") ? "" : key + " must be number"
}

function validateBoolean(variable,key) {
    return (typeof variable == "boolean") ? "" : key + " must be boolean"
}

function validatePassword(variable,key) {
    return (typeof variable == "string" && variable.length > 6) ? "" : key + " must be string and longer than 6 characters"
}

