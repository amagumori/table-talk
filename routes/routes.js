var api = require('./api')
  , index = require('./index')

var routes = function(app) {

  app.get('/index', index.index2);

  app.get('/api/articles/:id', api.getArticle);

  app.get('/api/articles/list', api.listArticles);      // controller not implemented yet

  app.del('/api/articles/:id', api.deleteArticle);

  app.post('/api/articles/:id/conversations', api.createConversation);

  app.post('/api/articles/:id/conversations/:id', api.createComment);

  app.put('/api/articles/:id/conversations/:id', api.editComment);
  app.del('/api/articles/:id/conversations/:id', api.deleteComment);

}

module.exports = routes;
