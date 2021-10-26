let curX = 0;
let curY = 0;
let radius = 100;

let height = window.innerHeight;
let width = window.innerWidth;

function setup() {
	console.log(width);
	console.log(height);
	createCanvas(width, height);
	// background(33);
	background(255, 204, 0);
	ellipse(radius / 2, height - radius / 2, radius);
}

function draw() {
	background(255, 204, 0);
	if (curX < width) {
		curX += 4;
	} else if (curX > 0) {
		curX -= 4;
	}
	if (curY < height) {
		curY += 4;
	} else if (curY > 0) {
		curY -= 4;
	}
	ellipse(curX, curY, radius);
}

// Prevent scrolling when touching the canvas
document.body.addEventListener(
	"touchstart",
	function (e) {
		if (e.target == canvas) {
			loop();
			e.preventDefault();
		}
	},
	{ passive: false }
);
document.body.addEventListener(
	"touchend",
	function (e) {
		if (e.target == canvas) {
			noLoop();
			e.preventDefault();
		}
	},
	{ passive: false }
);
document.body.addEventListener(
	"touchmove",
	function (e) {
		if (e.target == canvas) {
			ellipse(e.pageX, e.pageY, 15, 15);
			e.preventDefault();
		}
	},
	{ passive: false }
);
