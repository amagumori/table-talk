$(document).ready(function() { 
  $(".articlebody").highlighter({selector : '.tip' });
  var articleWidth = $('.articlebody').css('width');
  var scope = angular.element(".content").scope();
  console.log('scope: \n' + scope)
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
  var cssApplier = rangy.createCssClassApplier('hilite', { normalize : true });
  rangyHighlighter.addClassApplier(cssApplier);

    // call this like: showHighlight(comment[$index])

    var showHighlight = function(comment) { 
      var serializedSel = comment['selection'] 
      var range = rangy.deserializeSelection(serializedSel, undefined, document);
    };

  $(".articlebody").mouseup(function() { 
    var windowSel = window.getSelection()
    if (windowSel) { 
      var sel = rangy.getSelection();
      var rng = rangy.serializeSelection(sel, true);

      scope.newcomment['selection'] = rng;

      rangyHighlighter.highlightSelection('hilite');

      console.log('rainge should be pushed to scope: ' + JSON.stringify(scope.newcomment))

      var rect = windowSel.getRangeAt(0).getBoundingClientRect();
      var tooltipRect = [];

      tooltipRect['top'] = $("span.tip").offsetTop;
      tooltipRect['right'] = $("span.tip").offsetRight;
      tooltipRect['bottom'] = $("span.tip").offsetBottom;
      tooltipRect['left'] = $("span.tip").offsetLeft;

      console.log('CLICK EVENT LOC: ' + event.pageX + ', ' + event.pageY)
      console.log('boundingRect coords: ' + rect.top + ', '+ rect.right + ', ' + rect.bottom + ', ' + rect.left)


      console.log(event.pageX >= rect.left)
      console.log(event.pageX <= rect.right)
      console.log(event.pageY >= rect.top)
      console.log(event.pageY <= rect.bottom)

      // nested if statements......
      
      if (!((event.pageX >= rect.left && event.pageX <= rect.right) && (event.pageY >= rect.top && event.pageY <= rect.bottom))) {
        if (!((event.pageX >= tooltipRect.left && event.pageX <= tooltipRect.right) && (event.pageY >= tooltipRect.top && event.pageY <= tooltipRect.bottom))) { 
          console.log('should be removing highlights')
          rangyHighlighter.removeAllHighlights(); 
        }
      } else {
        rangyHighlighter.highlightSelection('hilite')
      }
    }
  })

  var highlighted = false;

  $(".comment").click(function() { 
    highlighted = !highlighted;
    if (highlighted == false) {
      $(this).css('border', '2px solid red')
    } else {
      $(this).css('border', '1px solid red')
    }
  })

  $(".submit").click(function() { 
    spinner.spin(loader)
  })
})
