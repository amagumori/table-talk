var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  _ = require('underscore');

var CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' }, 
  body: { type: String, default: '' }
});

CommentSchema.statics = {
  load: function(id, cb) { 
    this.findOne({_id : id})
    .populate('author', { select : 'name av' })
    .exec(cb)
  }
}

module.exports = mongoose.model('Comment', CommentSchema);
