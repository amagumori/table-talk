
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.index2= function(req, res) { 
  res.render('index2');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
