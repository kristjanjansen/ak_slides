page('/', renderIndex)
page('/:slide', renderSlides)
page('/:slide/slideshow', renderSlideshow)
page({dispatch: true, click: true})

function renderIndex(ctx, next) {
  
  $('body').removeAttr('class').removeAttr('style')
  
  $.get('/slides/_index.txt', function(data) {

    $('.wrapper').html(
      Mustache.render($('#index').html(), {index: data.split('\n')})
    )

  }, 'text')

}

function renderSlides(ctx, next) {
  
  $('body').removeAttr('class').removeAttr('style')
    
  $.get('/slides/' + ctx.params.slide, function(data) {
    
    var y = 0;
    
    var content = marked(data, {breaks: true})
      .replace(/href/g, 'target="_blank" href')
              
    $('.wrapper').html(
      Mustache.render($('#slides').html(), {slide: ctx.params.slide, content: content})    
    )
    
  }, 'text')

}

function renderSlideshow(ctx, next) {
    
  $.get('/slides/' + ctx.params.slide, function(data) {
    
    var slides = []
    var x = 0
    
    var data = data
      .split('\n\n\n')
      .map(function(item) { 
        return marked(item, {breaks: true})
      })
      .map(function(item) {
        return item.replace(/href/g, 'target="_blank" href')
      })
      .forEach(function(item) {
        slides.push({slide: item, x: x += 1200})
      })
  
    // console.log(slides)
    
    $('.wrapper').html(
      Mustache.render($('#slideshow').html(), {slide: ctx.params.slide, slides: slides})    
    )

    impress().init()
    
  }, 'text')

}