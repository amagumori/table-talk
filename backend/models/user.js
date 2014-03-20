var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  _ = require('underscore');

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
    var iter = 10000;
    var keylen = 128;


    var salt = crypto.randomBytes('128');
    crypto.pbkdf2(user.pw, salt, iter, keylen, function(err, derivedKey) {
      if (err) return next(err);
      user.salt = salt.toString('base64');
      user.pw = new Buffer(derivedKey, 'binary').toString('base64'); 
      next();
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
    
  }

}

module.exports = mongoose.model('User', UserSchema);
