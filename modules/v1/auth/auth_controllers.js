const db = require("../../../core/db");
let bcrypt = require("bcryptjs");
const validation = require("../../../core/validation")
module.exports.login = async (props) => {
  const { username, passwd } = props.body;
  let data = await db.querySafe(
    `SELECT * FROM "user".users WHERE username = $1`,
    [username]    
  );
  data = data[0];
  if (!data) {
    return null;
  }  
  const match = await bcrypt.compare(passwd, data.passwd);
  if (match) {
    return data;
  }
  return null;
};

module.exports.register = async (props) => {
  let { name,age,username,email,passwd,lat,lng,bio } = props.body;

  let error = validation.validate(
    [
      {
        rule: "string",
        variable: name,
        key: "name",
      },
      {
        rule: "number",
        variable: age,
        key: "age",
      },
      {
        rule: "string",
        variable: username,
        key: "username",
      },
      {
        rule: "email",
        variable: email,
        key: "email",
      },
      {
        rule: "password",
        variable: passwd,
        key: "passwd",
      },        
      {
        rule: "string",
        variable: bio,
        key: "bio",
      },
    ],
    props
  );

  if (error.length > 0) {
    return {
      error: error,
    };
  }

  let exist= await db.querySafe(
    `SELECT * FROM "user".users WHERE email = $1 AND username =$2`,
    [email,username]    
  );
  if (exist[0]) {
    if(exist[0].email == email){
      return {
        error: "Email already taken",
        data: null,
      };
    }else{
      return {
        error: "Username already taken",
        data: null,
      };
    }    
  }  

  passwd = await bcrypt.hash(passwd, 10);

  let data = await db.querySafe(
    `INSERT INTO "user".users(name,age,username,email,passwd,lat,lng,bio,created_at) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      name,age,username,email,passwd,lat,lng,bio,new Date()
    ]
  );  
  return data;
};

