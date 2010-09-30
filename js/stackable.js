/* paulmwatson.com 2010. stackable. */
var stackable = {};

stackable.openInStack = function(event)
{
  var ele = $(event.currentTarget);
  var href = ele.attr('href');
  
  $.get(href, function(data)
  {
    ele.parents('.stackable').addClass('load_reveal');
    $('<section class="stackable load_reveal">' + data + '</section>').insertAfter('.stackable:last-child')
  });
  return false;
};

stackable.revealStack = function(event)
{
  var ele = $(event.currentTarget);
  
  if (ele.is('.load_reveal'))
  {
    console.log('load_reveal');
    ele.removeClass('load_reveal');
  }
  else
  {
    console.log('not load_reveal');
    ele.next().css('margin-left', '0');
  }
};

stackable.unrevealStack = function(event)
{
  var ele = $(event.currentTarget);
  ele.next().css('margin-left', '-10%');
};


$('.opens_in_stack').live('click', stackable.openInStack);
$('.stackable').live('mouseover', stackable.revealStack);
$('.stackable').live('mouseout', stackable.unrevealStack);