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

var canvas_dom = document.getElementsByTagName("canvas");
canvas_dom.addEventListener("touchstart", function (event) {
	// make this your canvas DOM element
	event.preventDefault();
});
canvas_dom.addEventListener("touchmove", function (event) {
	event.preventDefault();
});
canvas_dom.addEventListener("touchend", function (event) {
	event.preventDefault();
});
canvas_dom.addEventListener("touchcancel", function (event) {
	event.preventDefault();
});
