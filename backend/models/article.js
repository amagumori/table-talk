var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')
  , crypto = require('crypto');

var ArticleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
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
  }
}

module.exports = mongoose.model('Article', ArticleSchema);
