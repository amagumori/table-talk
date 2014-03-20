var Article = require('../backend/models/article')
  , User = require('../backend/models/user')
  , Conversation = require('../backend/models/conversation')
  , Comment = require('../backend/models/comment')

/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: "Bob",
    comments: [{
      name: "bob",
      date: "1394466574705",
      body: "this website sucks.",
      offset: "top: 200px;"
    },
    {
      name: "Carlos Castaneda",
      date: "3394466597625",
      body: "since i'm carlos castaneda i'm in the future.",
      offset: "top: 400px;"
    },
    {
      name: "Bob Jones",
      date: "9994466597625",
      body: "comment no. 3"
    }, 
    {
      name: "bob",
      date: "1394466574705",
      body: "this website sucks.",
      offset: "top: 200px;"
    },
    {
      name: "Carlos Castaneda",
      date: "3394466597625",
      body: "since i'm carlos castaneda i'm in the future.",
      offset: "top: 400px;"
    },
    {
      name: "Bob Jones",
      date: "9994466597625",
      body: "comment no. 3"
    }],
    article: "Lorem ipsum dolor sit amet, ad denique patrioque per. Vel eruditi fabellas molestiae ex, vel at assum tollit posidonium. Cum nostrum principes et, usu sint vituperata an, eam laudem consulatu in. Eam te nobis deseruisse, ius ne mundi consequat omittantur, dolorem fabellas consequat mel in. Sed urbanitas inciderint in, ne vide primis per.\n\n Ex primis complectitur sea, vel quidam possim te, ne quo porro dicit. Mei ad facer deleniti, cum cu facer tamquam.Id latine recteque mea. Sed nullam perpetua elaboraret ea, prompta deserunt eos ad, ad saepe similique est. Odio assum pertinacia quo et. Vim atqui facilis id, et falli laboramus mea. Eos populo accusam id, tantas regione comprehensam ea vis. Suas sententiae nec ad, laudem persius per ut. \n\n Eruditi albucius vel te, an paulo splendide vix.Graece tritani quaestio mei an, quo minimum consectetuer ad. Omnes quando diceret mei eu, ceteros civibus conclusionemque nec eu. Vel ea mutat appellantur, ex posse ignota pro. Eam te possit dictas. Affert graeco adipisci sit ut. Nec dico prompta efficiendi ad, facete luptatum pro at. Ex expetenda consetetur pro, sit numquam fabulas epicuri eu, pro feugiat prodesset honestatis id. Qui vide molestiae in, eum in virtute evertitur. Laoreet accusam eos ut. Cum laudem postulant gloriatur at, vix dolor incorrupte quaerendum te. Soleat luptatum theophrastus pri ad, id tation tollit usu.  Te lobortis adipiscing has, qui ut omnis tollit munere. Nec ne prima nonumy contentiones, eu pro nonumy semper. Nam ut populo delectus antiopam, mel ea solum dicat. Et rebum consul principes duo, ut eam utinam detraxit moderatius. Porro iudico accusam ea has, purto ridens euripidis eam ei, aliquip saperet impedit mea at. Ea solet vidisse vix, omnium deserunt eu mei. Per eu stet case.  Id vel quodsi sententiae, mel ad eripuit oportere dissentias. Nisl probo dicant ius ne, eum omnes corpora ullamcorper cu. Pri erat fuisset te, his omnis audiam no. Audire honestatis et cum, vis aperiri tractatos liberavisse ei. Adhuc corpora facilisis per in, cu simul possit vel. Per an eruditi delectus. Fugit tacimates mea an, veri eligendi est ea, nihil laudem albucius an vel. Tollit omittam nominati nam ut. Ut vel odio vitae consul, iriure commune est ex, numquam accusamus intellegat cu duo. Et eos audire intellegam neglegentur, te altera voluptua est. Sed cu tollit impetus, mea velit argumentum et, prompta admodum nostrum nec eu.  Fabulas fabellas eos ea. Ut nec repudiandae conclusionemque, ne voluptaria eloquentiam sit, mollis inimicus ea est. Nec probo iusto integre cu, ne sit probatus scripserit scribentur, usu tacimates lobortis ei. Mei ei viderer consetetur, sed probo liber an. Duis intellegebat sed an, no sit nemore indoctum, duo at libris prodesset. Ad pro facer viderer delectus, everti quaeque eos id. Quo meliore mediocritatem no, est erroribus scribentur reformidans id."
  });
};

/* ARTICLE CONTROLLERS */

exports.getArticle = function(req, res) { 
  Article.load(req.params.article, function(err, article) { 
    if (err) throw err
    var resp = JSON.stringify(article)
    res.json(resp)
  })
}

exports.deleteArticle = function(req, res) { 
  Article.load(req.params.article, function(err, article) { 
    if (err) throw err
    Article.remove({ _id : article._id }, function(err) { 
      if (err) throw err
      res.end(200)
    })
  }
}

/* CONVERSATION CONTROLLERS 
 * harden inputs
 * POST /api/articles/:id/ */

exports.createConversation = function(req, res) { 
  var conversation = JSON.parse(req.body)
  Conversation.save(conversation, function(err, convo, aff) { 
    if (err) throw err
    if (aff === 1)  { res.json(convo) }
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
  }
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
