const express = require('express') //fetching express module
const app = express()
const port = 5000

const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://new-user:newuser1234@youtubeclone-ev8r3.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))