/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: "Bob",
    comments: [{
      name: "bob",
      date: "1394466574705",
      body: "this website sucks."
    },
    {
      name: "Carlos Castaneda",
      date: "3394466597625",
      body: "since i'm carlos castaneda i'm in the future."
    }]
  });
};
