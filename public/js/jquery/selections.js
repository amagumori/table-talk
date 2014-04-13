$(document).ready(function() { 
  $(".articlebody").highlighter({selector : '.tip' });
  var articleWidth = $('.articlebody').css('width');
  var scope = angular.element(".row.content").scope();
  $('.tip').css('width', articleWidth);

  $(".commentbox").autosize();
  $(".commentbox").addClass('animated')

  // rangy stuff

  var highlighter = rangy.createHighlighter(document, 'textContent');
  var cssApplier = rangy.createCssClassApplier('highlightclass', { normalize : true });
  highlighter.addClassApplier(cssApplier);
  highlighter.highlightSelection('highlightclass');

    // call this like: showHighlight(comment[$index])

    var showHighlight = function(comment) { 
      var serializedSel = comment['selection'] 
      var range = rangy.deserializeSelection(serializedSel, undefined, document);
    };

  $(".articlebody").mouseup(function() { 
    var sel = rangy.getSelection();
    var rng = rangy.serializeSelection(sel, undefined, document);
    //scope.newcomment['selection'] = rng
  })

  $(".comment").click(function() { 
    var el = angular.element(this);
  })

})
