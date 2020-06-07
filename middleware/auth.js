const { User } = require('../models/User')

let auth = (req, res, next) => {
  // process auth

  // get tokens from client's cookie
  let token = req.cookies.x_auth;
  // decode the tokens and find the user in server
  User.findByToken(token, (err, user) => {
    if(err) throw err
    if(!user) return res.json({isAuth: false, error: true})

    req.token = token
    req.user = user
    next()
  })
  // if user, auth ok

}

module.exports = {auth};