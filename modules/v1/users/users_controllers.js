const db = require("../../../core/db");
const Path = require("path");
const fs = require("fs")
const validation = require("../../../core/validation")
let bcrypt = require("bcryptjs");
module.exports.getProfile = async (props) => {
 let profile = await db.query(
  `SELECT 
  users.id,users.name,users.age,users.username,users.email,users.lat,
  users.lng,users.bio, images.path
  FROM "user".users AS users
  LEFT JOIN "user".images AS images ON users.id = images.user_id
  WHERE users.id = $1`,
  [props.decode.id],
  props
 )
 let data = profile[0]
 data.images = profile.map((e) => e.path)
 return data
}

module.exports.getMatches = async (props) => {
  let leftMatches = await db.query(
   `SELECT 
   users.id,users.name,users.age,users.username,users.email,users.lat,
   users.lng,users.bio
   FROM "user".matches as matches
   INNER JOIN "user".users as users ON matches.user_id_2 = users.id
   WHERE matches.user_id_1 = $1
   `,
   [props.decode.id],
   props
  )
  let rightMatches = await db.query(
    `SELECT 
    users.id,users.name,users.age,users.username,users.email,users.lat,
    users.lng,users.bio
    FROM "user".matches as matches
    INNER JOIN "user".users as users ON matches.user_id_1 = users.id
    WHERE matches.user_id_2 = $1
    `,
    [props.decode.id],
    props
  )
  let allMatches = leftMatches.concat(rightMatches)
  let allImages = await db.query(
    `SELECT * from "user".images`,
    [],
    props
  )
  for (let element of allMatches) {
    element.image = allImages.filter((e) => e.user_id == element.id)
  }

  return allMatches
}


module.exports.editProfile = async (props) => {
  const {name,age,username,email,bio} = props.body
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

  let exist= await db.query(
    `SELECT * FROM "user".users WHERE email = $1 AND username =$2`,
    [username,email],
    props
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
  let data = await db.query(
    `UPDATE "user".users SET name = $1,age = $2,username = $3,email=$4, bio=$5 WHERE id = $6 RETURNING *`,
    [name,age,username,email,bio,props.decode.id],
    props
  );
  return data
}

module.exports.changePassword = async (props) => {
  let {old_password,new_password} = props.body
  let error = validation.validate(
    [
      {
        rule: "password",
        variable: old_password,
        key: "old_password",
      },
      {
        rule: "password",
        variable: new_password,
        key: "new_password",
      },    
    ],
    props
  );

  if (error.length > 0) {
    return {
      error: error,
    };
  }

  let user= await db.query(
    `SELECT * FROM "user".users WHERE id = $1 `,
    [props.decode.id],
    props
  );
  const match = await bcrypt.compare(old_password, user[0].passwd);
  if(match){
    new_password = await bcrypt.hash(new_password, 10);
    let data = await db.query(
      `UPDATE "user".users SET passwd = $1 WHERE id = $2 RETURNING *`,
      [new_password,props.decode.id],
      props
    );
    return data
  }
  return {
    error: "Wrong credentials",
  };

 
}

module.exports.uploadImage = async (props) => {
  let{base64,path} = props.body
  
    let name = Date.now().toString() +"."+ path.split(".").pop()
    path = Path.resolve(__dirname, "public/images", name);
    path = path.replaceAll("/modules/v1/users", "")
    fs.writeFileSync(path, base64.split(",").pop(), 'base64')
    await db.query(
      `UPDATE "user".users SET path = $1 WHERE id = $2 RETURNING *`,
      [name,props.decode.id],
      props
    );
    return "ok"
}

module.exports.deleteImage = async (props) => {
  let{path} = props.body
  let name = Path.resolve(__dirname, "public/images", path);
  name = name.replaceAll("/modules/v1/users", "")
  fs.unlinkSync(name)
  return "ok"
}

module.exports.deleteAccount = async (props) => {
/// TODO: delele user with others data
}

