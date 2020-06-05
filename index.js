const express = require('express') //fetching express module
const app = express()
const port = 5000

const bodyparser = require('body-parser')
const { User } = require('./models/user')

//application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}))

//application/json
app.use(bodyparser.json())


const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://new-user:newuser1234@youtubeclone-ev8r3.mongodb.net/<dbname>?retryWrites=true&w=majority', {
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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))