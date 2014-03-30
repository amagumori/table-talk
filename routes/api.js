var Article = require('../backend/models/article')
  , User = require('../backend/models/user')
  , Conversation = require('../backend/models/conversation')
  , Comment = require('../backend/models/comment')
  , docx = require('../backend/controllers/docx')
  , jwt = require('express-jwt')

/*
 * Serve JSON to our AngularJS client
 */

/* ARTICLE CONTROLLERS */

exports.listArticles = function(req, res) { 
  Article.list(function(err, articles) { 
    if (err) throw err
    var resp = JSON.stringify(articles)
    res.json(resp)
  })
}

/* POST /api/articles */

exports.createArticle = function(req, res) {

  var article = new Article(req.body);

  Article.save(article, function(err, result, numAff) { 
    if (err) throw err
    if ( numAff == 1) {
      res.end(200);
    }
  })
}

/* GET /api/articles with query string ?id=IDGOESHERE */

exports.getArticle = function(req, res) { 
  Article.load(req.params.article, function(err, article) { 
    if (err) throw err;
    var resp = JSON.stringify(article);
    res.json(resp);
  })
}

/* DEL /api/articles with query string ?id=IDGOESHERE */

exports.deleteArticle = function(req, res) { 
  Article.load(req.params.article, function(err, article) { 
    if (err) throw err;
    Article.remove({ _id : article._id }, function(err) { 
      if (err) throw err;
      res.end(200);
    })
  })
}

/* CONVERSATION CONTROLLERS 
 * harden inputs
 * POST /api/articles/:id/ */

exports.createConversation = function(req, res) { 
  var conversation = JSON.parse(req.body)
  Conversation.save(conversation, function(err, convo, aff) { 
    if (err) throw err
    if (aff === 1)  { res.json(convo) }     // then add this to $scope.conversations in ctrllrs.js
  })
}

/* COMMENT CONTROLLERS 
 * POST api/articles/:id/page/:id (?) */

exports.createComment = function(req, res) { 
  var comment = JSON.parse(req.body)
  Comment.save(comment, function(err, comment, aff) { 
    if (err) throw err
    if (aff === 1) { res.json(comment) }
  })
}

/* PUT /api/articles/:id/page/:id (?) */

exports.editComment = function(req, res) { 
  var comment = JSON.parse(req.body)
  Comment.save(comment, function(err, comment, aff) { 
    if (err) throw err
    if (aff === 1) { res.json(comment) }
  })
}

/* DEL /api/articles/:id/page/:id (?) */

exports.deleteComment = function(req, res) { 

}

/* USER CONTROLLERS */

/* POST /api/users/ */

exports.createUser = function(req, res) { 

}

/* PUT /api/users/:id */

exports.editUser = function(req, res) { 

}

/* DEL /api/users/:id 
 * delete all convos, comments, articles for this user */

exports.deleteUser = function(req, res) { 

}

exports.testDocx = function(req, res) {
  docx()
  res.send(200)
}
