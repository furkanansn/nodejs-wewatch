const auth_routes = require("../../modules/v1/auth/auth_routes")
const favorites_routes = require("../../modules/v1/favorites/favorites_routes")
const movies_routes = require("../../modules/v1/movies/movies_routes")
const users_routes = require("../../modules/v1/users/users_routes")

const {security} = require('../../middleware/security')


module.exports.set_v1_routes = (app) => {
    app.use('/api/v1/auth/' ,auth_routes)
    app.use('/api/v1/favorites',security,favorites_routes)
    app.use('/api/v1/movies',security,movies_routes)
    app.use('/api/v1/users',security,users_routes)
}





