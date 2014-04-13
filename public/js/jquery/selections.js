$(document).ready(function() { 
  $(".articlebody").highlighter({selector : '.tip' });
  var articleWidth = $('.articlebody').css('width');
  var scope = angular.element(".row.content").scope();
  $('.tip').css('width', articleWidth);

  $(".commentbox").autosize();
  $(".commentbox").addClass('animated')

  // spin.js !
  //
  var opts = {
    lines : 6,
    length: 0,
    width: 3,
    radius : 4,
    corners : 1.0,
    rotate: 19,
    trail: 66,
    speed: 1.3,
    direction: 'clockwise',
    shadow: true
  }
  var loader = $(".loader")
  var spinner = new Spinner(opts)

  // rangy stuff

  var rangyHighlighter = rangy.createHighlighter(document, 'textContent');
  var cssApplier = rangy.createCssClassApplier('highlightclass', { normalize : true });
  rangyHighlighter.addClassApplier(cssApplier);
  rangyHighlighter.highlightSelection('highlightclass');

    // call this like: showHighlight(comment[$index])

    var showHighlight = function(comment) { 
      var serializedSel = comment['selection'] 
      var range = rangy.deserializeSelection(serializedSel, undefined, document);
    };

  $(".articlebody").mouseup(function() { 
    var sel = rangy.getSelection();
    var rng = rangy.serializeSelection(sel, undefined, document);
    console.log('SHUCH FENOMENAL RAINGE.  ' + rng);
  })

  $(".comment").click(function() { 
    var el = angular.element(this);
  })

  $(".submit").click(function() { 
    spinner.spin(loader)
  })
})
