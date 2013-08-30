page('/', renderIndex)
page('/:slide', renderSlides)
page({dispatch: true, click: true})

function renderIndex(ctx, next) {
  
  $.get('/slides/index.txt', function(data) {

    $('.wrapper').html(
      Mustache.render($('#index').html(), {index: data.split('\n')})
    )

  }, 'text')

}

function renderSlides(ctx, next) {
    
  $.get('./slides/' + ctx.params.slide, function(data) {
    
    var slides = data
      .split('\n\n\n')
      .map(function(item) { 
        return marked(item, {breaks: true})
      })
      .map(function(item) {
        return item.replace(/href/g, 'target="_blank" href')
      })
        
    $('.wrapper').html(
      Mustache.render($('#slides').html(), {slide: ctx.params.slide, slides: slides})    
    )

  }, 'text')

}