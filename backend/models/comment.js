var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  _ = require('underscore');

var CommentSchema = new Schema({
  author: { type: String }, //Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' }, 
  body: { type: String, default: '' },
  offsetTop: { type : Number },
  selection: { type: String }
});

CommentSchema.statics = {
  load: function(id, cb) { 
    this.findOne({_id : id})
    .populate('author', { select : 'name av' })
    .exec(cb)
  },
  list: function(cb) { 
    this.find()
    .exec(cb)
  }
}

mongoose.model('Comment', CommentSchema);
