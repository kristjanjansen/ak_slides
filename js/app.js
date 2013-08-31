page('/', renderIndex)
page('/:slide', renderSlides)
page('/:slide/slideshow', renderReveal)
page({dispatch: true, click: true})

function renderIndex(ctx, next) {
  
  $.get('/slides/_index.txt', function(data) {

    $('.wrapper').html(
      Mustache.render($('#index').html(), {index: data.split('\n')})
    )

  }, 'text')

}


function renderSlides(ctx, next) {
    
  $.get('/slides/' + ctx.params.slide, function(data) {
    
    var content = marked(data, {breaks: true}).replace(/href/g, 'target="_blank" href')
        
    $('.wrapper').html(
      Mustache.render($('#slides').html(), {slide: ctx.params.slide, content: content})    
    )

  }, 'text')

}


function renderReveal(ctx, next) {
    
  $.get('/slides/' + ctx.params.slide, function(data) {
    
    var slides = data
      .split('\n\n\n')
      .map(function(item) { 
        return marked(item, {breaks: true})
      })
      .map(function(item) {
        return item.replace(/href/g, 'target="_blank" href')
      })
        
    $('body').html(
      Mustache.render($('#reveal').html(), {slides: slides})    
    )

    Reveal.initialize({
  	  controls: true,
  	  progress: false,
  	  history: true,
  	  center: true,
  	  transitionSpeed: 'fast',
  	  transition: 'none',
    })
    
  }, 'text')

}