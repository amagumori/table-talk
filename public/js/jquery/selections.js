$(document).ready(function() { 
  $(".articlebody").highlighter({selector : '.tip' });
  var articleWidth = $('.articlebody').css('width');
  $('.tip').css('width', articleWidth);

  var saveSelection, restoreSelection;
  if (window.getSelection) { 
    saveSelection = function() { 
      var sel = window.getSelection(), ranges = [];
      if (sel.rangeCount) { 
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
          ranges.push(sel.getRangeat(i));
        }
      }
      return ranges;
    };

    restoreSelection = function(savedSelection) { 
      var sel = window.getSelection();
      sel.removeAllRanges();
      for (var i = 0, len = savedSelection.length; i < len; ++i) {
        sel.addRange(savedSelection[i]);
      }
    };

  } else if (document.selection && document.selection.createRange) { 
    saveSelection = function() { 
      var sel = document.selection;
      return (sel.type != "None") ? sel.createRange() : null;
    };
    restoreSelection = function(savedSelection) { 
      if (savedSelection ) { 
        savedSelection.select();
      }
    };
    
  }

  $.fn.selectRange = function(start, end) { 
    return this.each(function() { 
      if(this.setSelectionRange) { 
        this.focus();
        this.setSelectionRange();
      } else if (this.createTextRange) { 
        var range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    });
  };


  var savedSel = null;
  $(".tip").focus(function() { 
    savedSel = saveSelection();
    //$(".articlebody").selectRange(savedSel);  
  }).blur(function() { 
    $(".articlebody").selectRange(savedSel);  
  });
})
