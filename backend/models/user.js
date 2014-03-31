var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')
  , crypto = require('crypto')

var UserSchema = new Schema({
  name: { type: String },
  av: { type : String },
  email: { type: String },
  pw: { type: String },
  salt: { type: String },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  peers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// virtual 

UserSchema.virtual('password')
  .set(function(password) { 
    this._password = password
    this.salt = crypto.randomBytes(128)
    this.encryptPassword(password)
  })
  .get(function() { return this._password })


var validatePresenceOf = function (value) {   
  return value && value.length
}

UserSchema.pre('save', function(next) { 

  if (!user.isModified('pw')) return next();

});

UserSchema.methods = {

  compare: function(plaintext) { 
    return this.encryptPassword(plaintext) === this.pw;
  },

  encryptPassword: function(password) { 
    // if the hash function fails p. sure you have no pw security at all.
    // extremely insecure for now
    var iter = 10000;
    var keylen = 128;
    if (!password) return ''

    crypto.pbkdf2(this.pw, this.salt, iter, keylen, function(err, derivedKey) {
      if (err) return ''
      this.pw = new Buffer(derivedKey, 'binary').toString('base64'); 
    }); 
  }
}

UserSchema.statics = {

  load: function(id, cb) { 
    this.findOne({ _id : id })
    .populate('articles')
    .populate('comments', { select: 'date body _id' })
    .populate('conversations')
    .exec(cb)
  },
  list: function(ids, cb) { 
    this.find()
    .exec(cb)    
  }
}

module.exports = mongoose.model('User', UserSchema);
