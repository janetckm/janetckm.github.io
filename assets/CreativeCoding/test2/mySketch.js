/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/1023452

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

let geoms


let message = "我祈求一個熱吻卻沒有發生 我祈求一次渡假 勝地卻陸沉 月與星近期全變暗 出太陽亦覺黑暗 積極像我 仍十分傷感 我祈求一個伴侶 那伴侶太狠 我祈求一次倖免 最壞卻變真 若水星倒後再行 我道路怎麼要靠 星宿來引"

let messageCanvases
let geometry
let size

function preload() {
  font = loadFont('NotoSerifTC-Black.otf');
}

function setup() {
	var renderer = createCanvas(800, 800, WEBGL)
	geoms = [];
	for(var i = 0; i < 20; i++) {
		geoms[i] = new ExtrudeGeom(i, renderer);
	}


	noStroke()

	messageCanvases = []
	message.split(" ").forEach(word => {

		var messageCanvas = createGraphics(word.length*45, 60)
		messageCanvas.pixelDensity(10)
		messageCanvas.textSize(32)
		messageCanvas.textFont(font)
		messageCanvas.textAlign(CENTER, CENTER)
		messageCanvas.fill(199,48,120,200)
		messageCanvas.text(word, messageCanvas.width/2, messageCanvas.height/3.2)
		messageCanvases.push(messageCanvas)
	})
}

function draw() {
	rotateY(frameCount/200)
	background(255)
	orbitControl()
	for(var i = 0; i < geoms.length; i++) {
		texture(messageCanvases[i%messageCanvases.length])
		geoms[i].draw()
	}
}

function keyPressed(){
	if(key=='f'){
		fullscreen(false)
		location.reload()
	}
}