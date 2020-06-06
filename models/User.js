const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number, // 1: admin
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password')){    
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash 
            next()
        })
    })
} else {
    next()
}
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
  //plainpassword 1234567   vs   hasedpassword in db
  //to compare, plainpassword has to be hased too and then compare two passwords
  bcrypt.compare(plainPassword, this.password, function(err, isMatched) {
    if(err) return callback(err),
    callback(null, isMatched)
  })
}

userSchema.methods.generateToken = function(callback)  {
  //generate tokesn using jsonwebtoken
  var user = this
  var token = jwt.sign(user._id.toHexString(),'secretToken')
  user.token = token
  user.save(function(err, user) {
    if(err) return callback(err)
    callback(null, user)
  })

}

const User = mongoose.model('User', userSchema)

module.exports = {User} //export model User