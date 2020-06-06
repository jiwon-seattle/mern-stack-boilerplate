const express = require('express') //fetching express module
const app = express()
const port = 5000
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const config = require('./config/key')

const { User } = require('./models/user')

//application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}))

//application/json
app.use(bodyparser.json())
app.use(cookieparser())

const mongoose =require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.post ('/register', (req, res) => {
  
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return (res.json({ success: false, err }))
    return res.status(200).json({ success: true})
  })
})

app.post('/login', (req, res) => {
  // find if there is the requested email in db
  User.findOne( { email: req.body.email}, (err, user) => {
      if(!user) {
        return res.json({
          loginSuccess: false,
          message : "There is no user information in database",
        })
      }
      // match the email with password in db
      user.comparePassword(req.body.password, (err, isMatched) => {
        if(!isMatched) return res.json({loginSuccess: false, message:"password is not correct"})
        //generate tokens for the user
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          
          // save token. where? cookie/local storage/session storage...
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId : user_id})

        }) 
      })
    })
  


})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))