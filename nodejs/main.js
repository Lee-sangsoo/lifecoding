var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

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
    <a href="/create">create</a>
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

// request = 요청, response = 응답
// request = 주소창, response = 웹화면
// request = 사용자가 입력한 내용
// response = request에 대한 응답
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
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        title = 'WEB - create';
        var list = makeList(filelist);
        var body = `
          <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>
        `;
        var template = templateHTML(title, list, body);
        response.writeHead(200);
        response.end(template);
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){ // 데이터가 request로 들어오는 족족 body에 덧붙인다.
        body += data;
      });
      request.on('end', function(){ // 더이상 들어오는 데이터가 없다면(end) 콜백 실행
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
      });

      response.writeHead(200);
      response.end('success');
    } else {
      response.writeHead(404);
      response.end('Not found');
    }

    
    
    
});
app.listen(3000);