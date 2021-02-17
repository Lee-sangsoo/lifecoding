var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
      `;
}

function makeList(filelist){
  var list = '<ul>';
  for(var i = 0; i<filelist.length; i++){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;  
    var title = queryData.id; 

    if(pathname === '/'){
        if(title === undefined){
          fs.readdir('./data', function(error, filelist){
            title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = makeList(filelist);
            var body = `<h2>${title}</h2><p>${description}</p>`;
            var template = templateHTML(title, list, body);
            response.writeHead(200);
            response.end(template);
          });
        } else {
            fs.readdir('./data', function(error, filelist){
              var list = makeList(filelist);
            fs.readFile(`./data/${title}`, 'utf8', function(err, description){
              var body = `<h2>${title}</h2><p>${description}</p>`;
              var template = templateHTML(title, list, body);
              response.writeHead(200);
              response.end(template);
            });
          });
        }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }

    
    
    
});
app.listen(3000);