const express = require('express')
const logger = require('morgan')
const app = express();
const cors = require('cors')
const path = require("path")
var cron = require('node-cron');

const {set_v1_routes} = require("./routes/v1/routes");
const errorHandler = require('./middleware/error_handler');
const { TheMovieDb } = require('./core/third_party_connection');



app.use(cors())
app.use(logger('dev'))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
set_v1_routes(app)
app.use(errorHandler)

const job = cron.schedule("0 0 8 * * *", async () => {
    console.log("run")
    let themoviedb = new TheMovieDb()
    await themoviedb.syncMovies()
  });

job.start()  

module.exports = app;


