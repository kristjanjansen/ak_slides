var path = require('path');
var express = require('express');

app = express()

var static = ['css','fonts','js','slides','vendor']
  .forEach(function(item){
    app.use('/' + item, express.static(path.join(__dirname, item)))
})

app.get('/*', function(req, res){
  res.sendfile(path.join(__dirname, 'index.html'));
});
  
app.listen(3000)
