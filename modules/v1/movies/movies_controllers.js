const db = require("../../../core/db");
const validation = require("../../../core/validation")
module.exports.get = async (props) => {
 return await db.query(
  `SELECT * FROM movie.movies
  ORDER BY id DESC `,
  [],
  props
 )

}
