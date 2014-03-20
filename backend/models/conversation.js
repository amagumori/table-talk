var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')

var ConversationSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  selection: {
    rectCoords : [{ type: Number }],
    range: [{ type: Number }]
  },
  connection: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


ConversationSchema.statics = {
  /* id - id String
   * cb - callback()*/
  load: function(id, cb) {
    this.findOne({_id : id})
    .populate('author', { select: 'name av'})
    .populate('comments')
    .exec(cb)
  },
  /* ids - Array of ids
   * cb - callback()*/
  list: function(ids, cb) { 
    this.find({
      '_id' : { $in: ids }
    })
    .populate('author', { select: 'name av'})
    .populate('comments')
    .exec(cb)
  }
}

module.exports = mongoose.model('Conversation', ConversationSchema);
