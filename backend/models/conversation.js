var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  _ = require('underscore');

var ConversationSchema = new Schema({
  author: { type: ObjectId },
  selection: {
    offset: { type: Number }
    length: { type: Number }
  },
  connection: { type: Boolean, default: false },
  comments: [{ type: ObjectId }]
});
