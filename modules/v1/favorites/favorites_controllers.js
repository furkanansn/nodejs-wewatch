const db = require("../../../core/db");

const validation = require("../../../core/validation")
module.exports.get = async (props) => {
 let profile = await db.query(
  `SELECT 
  users.id,users.name,users.age,users.username,users.email,users.lat,
  users.lng,users.bio, images.path
  FROM "user".users AS users
  INNER JOIN "user".images AS images ON users.id = images.user_id
  WHERE users.id = $1`,
  [props.decode.id],
  props
 )
 let data = profile[0]
 data.image = profile.map((e) => e.path)
 return data
}
