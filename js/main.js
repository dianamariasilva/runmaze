var mapaDiv = document.getElementById("mapa");
var izq = document.getElementById("left");
var der = document.getElementById("right");
var go = document.getElementById("forward");
var buscar = document.getElementById("buscar");
var actual;
var muro;
var mapa=[
	"******************",
	"*_________*______*",
	"*_*****_____******",
	"*_*___*_***_*__*_*",
	"*_*_*_*_*_____**_*",
	"***_*___*_*__*___*",
	"*___******__**_*_*",
	"*____*______*__*_*",
	"*_**_*_******_**_*",
	"*o*___________**W*",
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
				actual={td:td,x:i,y:j,direccion:0};
			}
			else if(mapa[i][j]=="W")
				td.setAttribute("class","fin");
			tr.appendChild(td);
			celdas[i][j]=td;
		}
		tabla.appendChild(tr);
	}
	mapaDiv.appendChild(tabla);
	var casa = document.createElement("img");
	casa.src= "img/home.png";
	celdas[10][1].appendChild(casa);
}


function jugar(){
	var img = document.createElement("img");
	img.src =  "img/0.png";
	actual.direccion= "0";
	actual.td.appendChild(img);
}
dibujarMapa();
jugar();
//console.log(celdas);
/*
Si direccion=0 la flecha esta hacia arriba
Si direccion=1 la flecha esta hacia derecha
Si direccion=2 la flecha esta hacia abajo
Si direccion=3 la flecha esta hacia izquierda
*/

der.onclick = function(){
	if(actual==undefined){
		alert("El juego terminó, actualiza la página.");
		return;
	}
	var dir_actual=actual.direccion;
	dir_actual++;
	dir_actual %=4;
	actual.td.removeChild(actual.td.firstChild);
	var img = document.createElement("img");
	img.src =  "img/"+dir_actual+".png";
	actual.direccion= dir_actual;
	actual.td.appendChild(img);
};
izq.onclick = function(){
	if(actual==undefined){
		alert("El juego terminó, actualiza la página.");
		return;
	}
	var dir_actual=actual.direccion;
	dir_actual--;
	if(dir_actual <0)
		dir_actual = 3;
	actual.td.removeChild(actual.td.firstChild);
	var img = document.createElement("img");
	img.src =  "img/"+dir_actual+".png";
	actual.direccion= dir_actual;
	actual.td.appendChild(img);
};
go.onclick = function(){

	if(actual==undefined){
		alert("El juego terminó, actualiza la página.");
		return;
	}
	var dir_actual=actual.direccion;
	var img = document.createElement("img");

	if(dir_actual== 0){
		if(mapa[actual.x-1][actual.y] == "_" || mapa[actual.x-1][actual.y] == "W" ){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[(actual.x)-1][actual.y],x:(actual.x)-1,y:actual.y};
			img.src =  "img/"+dir_actual+".png";
			actual.direccion = dir_actual;
			actual.td.appendChild(img);
		}
		else if(mapa[actual.x-1][actual.y]== "*" )
			muro = {flag:true,direccion:0}
	}
	else if(dir_actual== 1){
		if(mapa[actual.x][actual.y+1] == "_" || mapa[actual.x][actual.y+1] == "W"){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[actual.x][actual.y+1],x:actual.x,y:actual.y+1};
			img.src =  "img/"+dir_actual+".png";
			actual.direccion= dir_actual;
			actual.td.appendChild(img);
		}
		else if(mapa[actual.x][actual.y+1]== "*" )
			muro = {flag:true,direccion:1}
	}
	else if(dir_actual== 2){
		if(mapa[actual.x+1][actual.y] == "_" || mapa[actual.x+1][actual.y] == "W"){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[(actual.x)+1][actual.y],x:(actual.x)+1,y:actual.y};
			img.src =  "img/"+dir_actual+".png";
			actual.direccion= dir_actual;
			actual.td.appendChild(img);
		}
		else if(mapa[actual.x+1][actual.y]== "*" )
			muro = {flag:true,direccion:2}
	}
	else if(dir_actual== 3){
		if(mapa[actual.x][actual.y-1] == "_" || mapa[actual.x][actual.y-1] == "W"){
			actual.td.removeChild(actual.td.firstChild);
			actual = {td:celdas[actual.x][actual.y-1],x:actual.x,y:actual.y-1};
			img.src =  "img/"+dir_actual+".png";
			actual.direccion= dir_actual;
			actual.td.appendChild(img);
		}
		else if(mapa[actual.x][actual.y-1]== "*" )
			muro = {flag:true,direccion:3};
	}

	if(mapa[actual.x][actual.y] == "W" ){
		actual.td.removeChild(actual.td.firstChild);
		//img.src =  "img/"+d+".png";
		actual.appendChild(img)
		celdas=[];
		actual=undefined;
	}
};


var timerr;
buscar.onclick = function(){
	timerr = setInterval(buscarSalida,200);
};
var direccion=actual.direccion-1;
function buscarSalida(){
	if(actual==undefined)
		clearInterval(timerr);
	if(muro !=undefined){
		actual.td.removeChild(actual.td.firstChild);
		var img=document.createElement("img");
		img.src="img/"+ direccion +".png";
		actual.td.appendChild(img);
		actual.direccion=direccion;
		muro=undefined;
		direccion++;
		direccion = direccion % 4;
	}
	else{
		go.click();
		if(muro ==undefined && actual !=undefined){
			direccion = actual.direccion-1;
			if(direccion ==-1)
				direccion = 3;
		}
	}
}




window.onload = function(){
	document.onkeyup = function(event){
		if(event.keyCode==37)
			izq.click();
		if(event.keyCode == 38)
			go.click();
		if(event.keyCode == 39)
			der.click();
	}
};
