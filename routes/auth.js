var jwt = require('express-jwt')
  , User = require('../backend/models/User')

exports.loginAuth = function(req, res) { 
  User.findOne({ name : req.body.username })
  
}    
