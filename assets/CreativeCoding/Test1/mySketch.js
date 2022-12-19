/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/647356

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

var circles = []
var total = 300
var img
function setup() {
	createCanvas(758, 758)

	loadImage('shiga3.png', function(img2) {
	  background(255)
    img = img2

		for(var i = 0; i < total; i++){
			circles[i] = {};
			circles[i].pos = {x: random(width), y: random(height)}
			circles[i].prevPos = {x: circles[i].pos.x, y: circles[i].pos.y}
			circles[i].dir = random() > 0.5 ? 1 : -1
			circles[i].radius = random(3, 10)
			circles[i].angle = random(TWO_PI)
		}
  })
}

function draw() {
	//image loading
  if(!img){
	 background(255);
   if(frameCount%2) text("loading", width/2, height/2)
   return
  }

	for(var i = 0; i < total; i++){
		var circle = circles[i]

		circle.angle += 1/circle.radius*circle.dir
		circle.pos.x += cos(circle.angle) * circle.radius
		circle.pos.y += sin(circle.angle) * circle.radius

		var color = img.get(circle.pos.x, circle.pos.y)
		var bright = brightness(color)
		color[3] = 50

		if(bright < 20 || random() < 0.01){
			circle.dir *= -1
			circle.radius = random(3, 5)
		}

		if(circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height){
			circle.angle += PI
		}

		strokeWeight(map(bright, 0, 255, 1, 0))
		stroke(color)
		line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y)

		circle.prevPos.x = circle.pos.x
		circle.prevPos.y = circle.pos.y
	}
}
