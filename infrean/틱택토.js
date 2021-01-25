var 바디 = document.body;

var 테이블 = document.createElement('table');

테이블.style.width = '100%';
테이블.setAttribute('border', '1');

for(var i = 0; i<3; i++){
    var 줄 = document.createElement('tr');
    for(var j = 0; j<3; j++){
        var 칸 = document.createElement('td');
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}

바디.append(테이블);

테이블.style.border = "3";