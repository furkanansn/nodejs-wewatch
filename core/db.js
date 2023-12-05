const { Pool } = require('pg');
const pg = require("pg")

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    ssl: true
});

/// Insert Example 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'


module.exports.query = async (text,params,req) => {
        
        let  response = await pool.query(text,params);
        let sql = text
        let user_id = 0
        let ip = ""
        let path = ""
        if(params){
           sql = text + " " + params.join(",")
        }

        try {
            if(typeof req.decode!= "undefined") {
                user_id = req.decode.user_id
            }
            if(req.socket){
                ip = req.socket.localAddress.toString()
            }
            if(typeof req.protocol!= "undefined"){
                path=  `${req.protocol}://${req.get('host')}${req.originalUrl}`

            }
        }catch (e) {

        }
        await pool.query("INSERT INTO log.logs(sql,ip,user_id,date,path) VALUES($1,$2,$3,$4,$5)",
                         [sql,ip,user_id,new Date(),path])

        return response.rows;
}

module.exports.querySafe = async (text,params) => {    
    let  response = await pool.query(text,params);
    return response.rows;
}

module.exports.getTime = ()=> {
  const types = pg.types;
 let time = types.setTypeParser(1114,function (stringvalue){
     
      return new Date(stringvalue+"+0000")
  })
    return time
}
