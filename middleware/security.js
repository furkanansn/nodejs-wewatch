const jwt = require("jsonwebtoken");
const api_secret_key = require("../config/api_secret_key");
const response = require("../config/response");

function security(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.json("Unauthorized Access");
  } else {
    jwt.verify(token, api_secret_key, (error, decoded) => {
      if (error) {
        res.json(response(true, "Unauthorized Access"));
      } else {
        req.decode = decoded;
        let canNext = true//handler(req, decoded.permissions);
        if (canNext) {
          try {
            next();
          } catch (error) {
            res.json(response(true, error));
          }
        } else {
          res.json(response(true, "Unauthorized Access"));
          
        }
      }
    });
  }
}

function handler(req, permission_list) {
  let canNext = false;
  let path = req.originalUrl.split("api/").pop();
  if(path.includes("?")){
    path = path.substring(0, path.indexOf("?"));
  }
  let map = mapGenerator();
  let permission = map[path];

    permission_list.map((item) => {
      if (item.id == permission) {
        canNext = true;
      }
    });

  return canNext;
}


function mapGenerator() {
  let map = new Map();

  map["users/create"] = 3;
  
  return map;
}

module.exports = {security};
