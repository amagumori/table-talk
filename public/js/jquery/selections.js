$(document).ready(function() { 
  $(".articlebody").highlighter({selector : '.tip' });
  var articleWidth = $('.articlebody').css('width');
  console.log('width: ' + articleWidth)
  $('.tip').css('width', articleWidth);
})
