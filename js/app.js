page('/', renderIndex)
page('/slides/:slide/page', renderSlides)
page('*', attachHandler)
page({dispatch: true, click: false})

function attachHandler(ctx, next) {

  $('a').click(function(e){
    var url = $(this).attr('href')
    page(url)
    e.preventDefault()

  })
}

function renderIndex(ctx, next) {
  
  $.get('/slides/index.txt', function(data) {

    $('.wrapper').html(
      Mustache.render($('#index').html(), {index: data.split('\n')})
    )
    next()
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

    next()

  }, 'text')

}