var api = require('./api')
  , index = require('./index')

var routes = function(app, jwt) {

  app.get('/', index.index2);
  app.get('/postarticle', index.postarticle);

  app.get('/api/articles/:id', api.getArticle);
  app.get('/api/articles/list', api.listArticles);      // controller not implemented yet
  app.del('/api/articles/:id', api.deleteArticle);

  app.post('/api/conversations', api.createConversation);

  app.post('/api/articles/:id/conversations/:id', api.createComment);
  app.put('/api/articles/:id/conversations/:id', api.editComment);
  app.del('/api/articles/:id/conversations/:id', api.deleteComment);

  //app.post('/auth', auth.auth);

  app.get('/partials/:name', index.partials)

  app.get('/api/comments', api.listComments);

}

module.exports = routes;
