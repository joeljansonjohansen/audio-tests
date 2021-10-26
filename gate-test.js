/* ===
Testing the possibilities of Tone.js Gate
=== */

function setup() {
	const gate = new Tone.Gate(-30, 0.2).toDestination();
	const meter = new Tone.Meter();
	const mic = new Tone.UserMedia().connect(meter);
	// the gate will only pass through the incoming
	// signal when it's louder than -30db

	mic
		.open()
		.then(() => {
			// promise resolves when input is available
			// print the incoming mic levels in decibels

			console.log("mic open");
			//console.log(gate.output.value);
			setInterval(() => console.log(meter.getValue()), 100);
		})
		.catch((e) => {
			// promise is rejected when the user doesn't have or allow mic access
			console.log("mic not open");
		});
}

document.getElementById("startButton")?.addEventListener("click", async () => {
	await Tone.start();
	console.log("audio is ready");
	setup();
	console.log("setup is ready");
});
