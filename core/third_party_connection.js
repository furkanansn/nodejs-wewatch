const axios = require("axios");
const db = require("./db");
axios.defaults.timeout = 100000;

class TheMovieDb{
  base_url = "https://api.themoviedb.org/3"
  async syncMovies() {
    try {
      let arr = [];
      const response = await axios.get(this.base_url + "/movie/now_playing?api_key=e45ab9f884d7887d308af0a06031be0c&language=tr-TR", {        
      });
      response.data.results.map(async (item) => {
       let exist= await db.querySafe(
          `SELECT * FROM movie.movies WHERE sid = $1`,
          [item.id]          
        )
        if(exist.length == 0){
          await db.querySafe(
            `INSERT INTO movie.movies(original_title,overview,popularity,poster_path,release_date,title,vote_average,vote_count,sid) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [
              item.original_title,item.overview,item.popularity,item.poster_path,item.release_date,item.title,item.vote_average,item.vote_count,item.id
            ]            
          );  
        }
      
      });
      
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { TheMovieDb };
