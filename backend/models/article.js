var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')
  , crypto = require('crypto');

var ArticleSchema = new Schema({
  file: { type: String, default: '' },
  page: [{
    offset: { type: Number },
    conversations: [{ type: ObjectId }]
  }]
});
