function setup() {
	let height = window.innerHeight;
	let width = window.innerWidth;
	console.log(width);
	console.log(height);
	createCanvas(width, height);
	background(33);
	let radius = 100;
	ellipse(radius / 2, height - radius / 2, radius);
}

function draw() {
	//background(220);
}
