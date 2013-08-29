$.get('./slides/index.txt', function(data) {

  $('body').html(
    Mustache.render($('#index').html(), {index: data.split('\n')})
  )
  
}, 'text')