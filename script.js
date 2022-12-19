/*CHOI Ka Man 20151123
 *
 * @name Noise Wave
 * @description Using Perlin Noise to generate a wave-like pattern.
 * Original by Daniel Shiffman.
 */

var sketch = function( p ) {

var yoff = 0.25;        // 2nd dimension of perlin noise

p.setup = function() {
  p.createCanvas(p.displayWidth, p.displayHeight-250);
};

p.draw = function() {
  //background(51);

  p.fill(50,50);
  // We are going to draw a polygon out of the wave points
  p.beginShape();

  var xoff = 0;       // Option #1: 2D Noise
  // float xoff = yoff; // Option #2: 1D Noise


  // Iterate over horizontal pixels
  for (var x = 0; x <= p.width; x += 10) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    var y = p.map(p.noise(xoff, yoff), 0, 1, p.mouseY+100,400);

    // Option #2: 1D Noise
    // float y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    p.vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }

   var a = y % 400;

  if (a < 100){
    p.fill(50, 50);
    p.stroke(149, 211, 214, 30);
    xoff+= 0.065;
  }

  // increment y dimension for noise
  yoff += 0.005;
  p.vertex(p.width, p.height);
  p.vertex(0, p.height);
  p.endShape();

};
};

var myP5 = new p5(sketch, 'wave');

// function([string1, string2],target id,[color1,color2])
consoleText(['design', 'make', 'code', 'teach', 'Under Construction'], 'text',['#5C6373']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 500)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 250)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}
