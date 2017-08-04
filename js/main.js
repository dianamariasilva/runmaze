var mapaDiv = document.getElementById("mapa");
var izq = document.getElementById("left");
var der = document.getElementById("right");
var go = document.getElementById("forward");
var actual;
var mapa=[
	"******************",
	"*_________*______*",
	"*_*****_____******",
	"*______***__*__*_*",
	"***_*____*____**_*",
	"*___*____**__*___*",
	"*_********__**_*_*",
	"*____*______*__*_*",
	"*_**_*__*****_**_*",
	"*o*__*________**W*",
	"******************"];
var celdas = new Array(mapa.length);
for (var i=0;i<mapa.length;i++)
	celdas[i]= new Array(mapa[0].length);


function dibujarMapa() {
	var tabla = document.createElement("table");
	for(var i=0;i<mapa.length;i++){
		var tr = document.createElement("tr");
		for(var j=0;j<mapa[0].length;j++){
			var td = document.createElement("td");
			if(mapa[i][j]=="*")
				td.setAttribute("class","muro");
			else if(mapa[i][j]=="_")
				td.setAttribute("class","limpio");
			else if(mapa[i][j]=="o"){
				td.setAttribute("class","inicio");
				actual={td:td,x:i,y:j};
			}
			else if(mapa[i][j]=="W")
				td.setAttribute("class","fin");
			tr.appendChild(td);
			celdas[i][j]=td;
		}
		tabla.appendChild(tr);
	}
	mapaDiv.appendChild(tabla);
}

function jugar(){
	var img = document.createElement("img");
	img.src =  "img/0.png";
	img.id= "0";
	actual.td.appendChild(img);
}
dibujarMapa();
jugar();
//console.log(celdas);
/*
Si id=0 la flecha esta hacia arriba
Si id=1 la flecha esta hacia derecha
Si id=2 la flecha esta hacia abajo
Si id=3 la flecha esta hacia izquierda
*/

der.onclick = function(){
	var idActual=actual.td.firstChild.id;
	idActual++;
	idActual %=4;
	actual.td.removeChild(actual.td.firstChild);
	var img = document.createElement("img");
	img.src =  "img/"+idActual+".png";
	img.id= idActual;
	actual.td.appendChild(img);
};
izq.onclick = function(){
	var idActual=actual.td.firstChild.id;
	idActual--;
	if(idActual <0)
		idActual = 3;
	actual.td.removeChild(actual.td.firstChild);
	var img = document.createElement("img");
	img.src =  "img/"+idActual+".png";
	img.id= idActual;
	actual.td.appendChild(img);	
};
go.onclick = function(){
	var idActual=actual.td.firstChild.id;
	var img = document.createElement("img");

	if(idActual== 0){
		if(mapa[actual.x-1][actual.y] == "_" || mapa[actual.x-1][actual.y] == "W" ){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[(actual.x)-1][actual.y],x:(actual.x)-1,y:actual.y};
			img.src =  "img/"+idActual+".png";
			img.id= idActual;
			actual.td.appendChild(img);
		}
	}
	else if(idActual== 1){
		if(mapa[actual.x][actual.y+1] == "_" || mapa[actual.x][actual.y+1] == "W"){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[actual.x][actual.y+1],x:actual.x,y:actual.y+1};
			img.src =  "img/"+idActual+".png";
			img.id= idActual;
			actual.td.appendChild(img);
		}
	}
	else if(idActual== 2){
		if(mapa[actual.x+1][actual.y] == "_" || mapa[actual.x+1][actual.y] == "W"){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[(actual.x)+1][actual.y],x:(actual.x)+1,y:actual.y};
			img.src =  "img/"+idActual+".png";
			img.id= idActual;
			actual.td.appendChild(img);
		}
	}
	else if(idActual== 3){
		if(mapa[actual.x][actual.y-1] == "_" || mapa[actual.x][actual.y-1] == "W"){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[actual.x][actual.y-1],x:actual.x,y:actual.y-1};
			img.src =  "img/"+idActual+".png";
			img.id= idActual;
			actual.td.appendChild(img);
		}
	}


	if(mapa[actual.x][actual.y] == "W" ){
		actual.td.removeChild(actual.td.firstChild);
		img.src =  "img/win.png";
		actual.td.appendChild(img);

		celdas=[];
		actual=undefined;
	}
};