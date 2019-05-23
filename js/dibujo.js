var canvas = document.getElementById('canvas')
var lienzo = canvas.getContext('2d')
var btnPlus = document.getElementById('plus')
var btnLess = document.getElementById('less')
var btnSave = document.getElementById('save')
var color = document.getElementById('color-paleta');
var colorCanvas = document.getElementById('color-lienzo');
var eliminar = document.getElementById('delete')
var circulo = document.getElementById('circulo')
var lineas = document.getElementById('lines')
var image = document.getElementById('file')
var state = 0;
var radius = 3;
var drawCircle = false
var maxRadius = 30;
var minRadius = 2;
var x, y;




canvas.addEventListener('mousedown', drawMouseDown)
canvas.addEventListener('mouseup', drawMouseUp)
canvas.addEventListener('mousemove', drawMouseMove)

btnSave.addEventListener('click', ()=>{
	let dataUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octect-strem')
	window.location.href = dataUrl

})
circulo.addEventListener('click', ()=> {
	drawCircle = true;
})
lines.addEventListener('click', ()=> {
	drawCircle = false;
})

eliminar.addEventListener('click', () => {
	lienzo.clearRect(1,1,canvas.width, canvas.height)
})

btnPlus.addEventListener('click', (evt)=>{
	radius += 2;

	if(radius >= maxRadius){
		radius = maxRadius;
	}
	document.getElementById('pincel-lavel').innerHTML = "[ " + radius + " ]";
})

btnLess.addEventListener('click', (evt)=>{
	radius -= 2;

	if(radius <= minRadius){
		radius = minRadius;
	}
	document.getElementById('pincel-lavel').innerHTML = "[ " + radius + " ]";
})

function drawMouseDown(evt){
	state = 1
	x = evt.layerX
	y = evt.layerY
	
}

function drawMouseMove(evt){
	if(state == 1){
		if(drawCircle === true){
			dibujarCirculos(color.value,x , y, evt.layerX, evt.layerY, lienzo, radius)
		}
		else {
			dibujarLinea(color.value,x , y, evt.layerX, evt.layerY, lienzo, radius)
		}
		
	}	
	
	x = evt.layerX;
	y = evt.layerY;
	
}

function drawMouseUp(evt){
	state = 0;
	x = evt.layerX;
	y = evt.layerY;
	
}

function dibujarLinea(color,xinicial, yinicial, xfinal, yfinal, lienzo, wide){
	lienzo.beginPath()
	lienzo.strokeStyle = color
	lienzo.lineWidth = wide
	lienzo.lineCap = 'round'
	lienzo.moveTo(xinicial, yinicial)
	lienzo.lineTo(xfinal, yfinal)
	lienzo.stroke()
	lienzo.closePath()
	
}

function dibujarCirculos(color,xinicial, yinicial, xfinal, yfinal, lienzo, wide) {
	lienzo.beginPath()
	lienzo.strokeStyle = color
	lienzo.lineWidth = wide
	lienzo.arc(xinicial, yfinal, 50, 0, 2 * Math.PI)
	lienzo.moveTo(xinicial, yinicial)
	lienzo.lineTo(xfinal, yfinal)
	lienzo.stroke()
	lienzo.closePath()
}

function deleteCanvas(lienzo){
	lienzo.clearRect(0,0, lienzo.width, lienzo.height);
}
