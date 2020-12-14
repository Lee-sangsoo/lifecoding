#생활코딩

 ## HTML 태그
  1. 브라우저에서 웹페이지 열기 `Ctrl + O`
  2. 문자 강조하기 `<strong> ... </strong>`
  3. 밑중 치기 `<u> ... </u>`
  4. 헤드 표시 `<h1> ... </h1>`  (숫자는 1부터 6까지 가능)
   - 숫자가 커질수록 글씨가 작아진다.
  5. 줄바꿈 `<br>` (감싸는 내용이 없고, 단독으로 실행되기 때문에 닫는 태그가 없다.)
  6. 단락 구분 `<p> ... </p>`
   - `<br>`과 `<p>`를 비교했을 때, CSS를 따로 사용하지 않는다면 `<p>`는 단락간의 간격 고정으로 인한 불편함이 있다.
   - CSS를 통해 극복 가능 `(<p style="margin-top:45px;">)`
  7. 페이지에 이미지 삽입 `<img src="주소" width="100%">`
  8. 목차를 구분짓는 태그 `<ul> ... </ul>`  과  `<ol> ... </ol>`
   - `<ul>`의 경우 unordered list로 일반 목차
   - `<ol>`의 경우 ordered list로 번호가 매겨지는 목차
  9. 목차 내용 태그 `<li> ... </li>`
   - `<il>, <ol>` 과 `<li>` 태그는 서로 부모 자식 관계의 태그이다. (함께 따라 간다)
 10. 페이지의 제목 부여 `<title> ... </title>`
 11. 코딩된 문자방식 알리기 `<meta charset="utf-8">`
 12. 본문임을 알리는 `<body> ... </body>` 구조 태그
 13. 본문에 대한 정보임을 알리는 `<head> ... </head>` 구조 태그
 14. `<body>`와 `<head>`를 감싸는 `<html> ... </html>` 태그
   - 시작 태그는 `<!doctype html>`과 같이 쓴다.
 
###
 
  <!doctype html>
  
   <head>
 
    <title> ... </title>
    
    <meta charset="">
    
   </head>
   
   
   
   <body>
 
    <ol>
    
     <li> ... </li>
     
    </ol>
    
   </body>
  
  </html>
