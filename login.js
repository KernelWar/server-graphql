const routes = require('express').Router()
const jwt = require('./jwt')
const bcrypt = require("bcrypt");
const models = require('./db')

routes.post("/login", function (request, response) {
    models.User.findOne({ where: { username: request.body.username } }).then(user => {
        let message = {
            token: null,
            message: 'Data invalid',
            user: null
        }
        if (user && request.body.password) {
            let checkPassword = bcrypt.compareSync(request.body.password, user.dataValues.password)
            let data = {
                id_user: user.dataValues.id_user,
                username: user.dataValues.username,
                full_name: user.dataValues.full_name
            }
            if (checkPassword) {
                message.token = jwt.createToken(data)
                message.message = "User valid"
                message.user = user
            }
            response.status(200).send(message)
            return
        }
        response.status(200).send(message)
        return
    })
    response.status(401)
})

routes.post("/verifyToken", jwt.authJWT, function (request, response){
    let message = {
        message: 'Token valid'
    }
    response.status(200).send(message);
})

module.exports = routes