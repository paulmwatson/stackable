/* paulmwatson.com 2010. stackable. */
var stackable = {};

stackable.openInStack = function(event)
{
  var ele = $(event.currentTarget);
  var parentStack = ele.parents('.stackable');
  var href = ele.attr('href');
  
  if ($('.stackable.pinned').length > 0)
  {
    $('.stackable.pinned').animate({'margin-right': '0'}, function()
    {
      $(this).removeClass('pinned');
      stackable.removeBeforeOpenInStack(href, parentStack);
    });
  }
  else
  {
    stackable.removeBeforeOpenInStack(href, parentStack);
  }
  
  return false;
};

stackable.removeBeforeOpenInStack = function(href, parentStack)
{
  var eleToRemove = parentStack.nextAll('.stackable');
  if (eleToRemove.length > 0)
  {
    var counter = 0;
    eleToRemove.fadeOut('fast', function()
    {
      counter++;
      $(this).remove();
      if (counter === 1)
      {
        console.log('d');
        stackable.openURLInStack(href, parentStack);
      }
    });
  }
  else
  {
    stackable.openURLInStack(href, parentStack);
  }
};

stackable.openURLInStack = function(href, parentStack)
{
  $.get(href, function(data)
  {
    parentStack.addClass('load_reveal');
    $('<section class="stackable load_reveal">' + data + '</section>').insertAfter('.stackable:last-child').hide().fadeIn();
  });
};

stackable.revealStack = function(event)
{
  var ele = $(event.currentTarget);
  
  if (!ele.is('.load_reveal') && !ele.is('.pinned'))
  {
    ele.next().css('margin-left', '0');
  }
};

stackable.unrevealStack = function(event)
{
  var ele = $(event.currentTarget);
  ele.removeClass('load_reveal');
  ele.next().css('margin-left', '-10%');
};

stackable.pinStack = function(event)
{
  var ele = $(event.currentTarget);
  if (ele.is('.pinned'))
  {
    ele.animate({'margin-right': '0'}, function()
    {
      $(this).removeClass('pinned');
    });
  }
  else
  {
    $('.stackable.pinned').animate({'margin-right': '0'}, function()
    {
      $(this).removeClass('pinned');
    });
    
    ele.animate({'margin-right': '10%'}, function()
    {
      $(this).addClass('pinned');
    });
  }
};


$('.opens_in_stack').live('click', stackable.openInStack);
//$('.stackable').live('mouseover', stackable.revealStack);
$//('.stackable').live('mouseleave', stackable.unrevealStack);
$('.stackable').live('click', stackable.pinStack);