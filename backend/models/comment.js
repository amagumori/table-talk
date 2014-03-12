var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  _ = require('underscore');

var CommentSchema = new Schema({
  author: { type: ObjectId },
  timestamp: { type: Date, default: Date.now },
  body: { type: String, default: '' }
});
