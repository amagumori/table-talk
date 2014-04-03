var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')
  , crypto = require('crypto');

var ArticleSchema = new Schema({
  author: { type: String }, //Schema.Types.ObjectId, ref: 'User' },
  file: { type: String, default: '' },
  page: [{
    offset: { type: Number },
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }]
  }]
});

ArticleSchema.statics = {
  load: function(id, cb) { 
    this.findOne({ _id : id })
    .populate('conversations')
    .exec(cb)
  },
  list: function(cb) { 
    this.find()
    .populate('conversations')
    .exec(cb)
  }
}

mongoose.model('Article', ArticleSchema);
