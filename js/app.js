//$(document).ready(function() {
/*
  page('/', renderIndex)
*/  
/*
  page({dispatch: true, click: false})

  $('a').on('click', function(ev) {
    var dir = $(this).attr(href)
    console.log(dir)
  })
*/
  
//})

$(document).ready(function() {

  page('/slides/:slides/page', renderSlides)
  page('/', renderIndex)
  page({dispatch: true})

})


function renderIndex(ctx, next) {
  
  $.get('./slides/index.txt', function(data) {

    $('.wrapper').html(
      Mustache.render($('#index').html(), {index: data.split('\n')})
    )
    next()
  
  }, 'text')

}

function renderSlides(ctx, next) {
    
  $.get('./slides/' + ctx.params.slides, function(data) {
    
    var slides = data
      .split('\n\n\n')
      .map(function(item) { 
        return marked(item, {breaks: true})
      })
        
    $('.wrapper').html(
      Mustache.render($('#slides').html(), {slide: ctx.params.slides, slides: slides})    
    )

  }, 'text')

}