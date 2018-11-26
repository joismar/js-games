// tilt the phone in order to collect the black circles into
// the red circle in the middle!

// create an array
var collectibles = [];

// how many?
var startingCount = 12;

// player Object
var player;

function setup() {

	frameRate(30);

	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < startingCount; i++) {
		collectibles.push(new Collectible());
	}

	player = new Player();
}

function draw() {
	background(255);

	// call EACH and EVERY object methods
	for (var i = 0; i < collectibles.length; i++) {
		collectibles[i].update();
		collectibles[i].display();

		// since we are already iterating thru all collectibles,
		// might as well check for player collision here
		var theDist = dist(collectibles[i].x, collectibles[i].y, player.x, player.y);

		// let's get exact w the collision distance:
		// if the edges of each object's radius meet the other,
		// then it's a hit
		var buffer = (player.diameter / 2) + (collectibles[i].diameter / 2);

		if (theDist <= buffer) {
			// collision!
			background(255, 0, 0); // flash screen

			collectibles.splice(i, 1); // delete the collectible that collided
		}
	}

	player.display();

	// did you win yet?
	if (collectibles.length == 0) {
		fill(0);
		textSize(100);
		textAlign(CENTER, CENTER);
		text("YOU WIN!", width / 2, height / 2);
	}

}

// create a class
function Collectible() {

	// keep track of position
	this.x = random(width);
	this.y = random(height);

	// velocity so things can have momentum
	this.velY = 0.0;
	this.velX = 0.0;

	this.diameter = 50;

	this.update = function() {
		// add phone rotation to velocity
		this.velY += rotationX;
		this.velX += rotationY;

		// then change position based on velocity (at 5%)
		this.x += this.velX * .05;
		this.y += this.velY * .05;

		// bonce off the walls!
		if (this.x > width - this.diameter / 2) {
			this.x = width - this.diameter / 2;
			this.velX *= -0.7;
		}

		if (this.x < this.diameter / 2) {
			this.x = this.diameter / 2;
			this.velX *= -0.7;
		}

		if (this.y > height - this.diameter / 2) {
			this.y = height - this.diameter / 2;
			this.velY *= -0.7;
		}

		if (this.y < this.diameter / 2) {
			this.y = this.diameter / 2;
			this.velY *= -0.7;
		}
	}

	this.display = function() {
		noStroke();
		fill(0, 126);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}

}

function Player() {
	this.x = width / 2;
	this.y = height / 2;

	this.diameter = 100;

	this.display = function() {
		strokeWeight(4);
		stroke(0);
		fill(255, 0, 0);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}
