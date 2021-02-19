var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
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
    ${control}
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
            var control = `<a href="/create">create</a>`;
            var template = templateHTML(title, list, body, control);
            response.writeHead(200);
            response.end(template);
          });
        } else {
            fs.readdir('./data', function(error, filelist){
              var list = makeList(filelist);
              fs.readFile(`./data/${title}`, 'utf8', function(err, description){
                var body = `<h2>${title}</h2><p>${description}</p>`;
                var control = `<a href="/create">create</a> 
                               <a href="/update?id=${title}">update</a>
                               <form action="delete_process" method="post">
                                <input type="hidden" name="id" value="${title}">
                                <input type="submit" value="delete">
                               </form>`;
                var template = templateHTML(title, list, body, control);
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
          <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>
        `;
        // create 에서는 update와 create 버튼이 나오지 않아도 되기 때문에 
        // control에 넘겨주지 않는다.
          var control = ``;
          var template = templateHTML(title, list, body, control);
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
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var list = makeList(filelist);
        fs.readFile(`./data/${title}`, 'utf8', function(err, description){
          var body = `
          <form action="/update_process" method="post">
          <input type ="hidden" name="id" value="${title}">
          <p><input type="text" name="title" value ="${title}"></p>
          <p>
              <textarea name="description">${description}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>
          `;
          var control = `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`;
          var template = templateHTML(title, list, body, control);
          response.writeHead(200);
          response.end(template);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){ 
        body += data;
      });
      request.on('end', function(){ 
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){ 
        body += data;
      });
      request.on('end', function(){ 
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(err){
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }

    
    
    
});
app.listen(3000);