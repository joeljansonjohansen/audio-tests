// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

let pitch;

async function setup() {
	// audioContext = new AudioContext();
	// stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
	// console.log(stream);
	// startPitch(stream, audioContext);

	const mic = new Tone.UserMedia();
	mic
		.open()
		.then(() => {
			// promise resolves when input is available
			console.log("mic open", Tone.context._context._nativeContext);
			// print the incoming mic levels in decibels
			//setInterval(() => console.log(meter.getValue()), 100);
			startPitch(mic._stream, Tone.context._context._nativeContext);
		})
		.catch((e) => {
			// promise is rejected when the user doesn't have or allow mic access
			console.log("mic not open");
		});
}

function startPitch(stream, audioContext) {
	pitch = ml5.pitchDetection("./model/", audioContext, stream, modelLoaded);
}

function modelLoaded() {
	document.querySelector("#status").textContent = "Model Loaded";
	getPitch();
}

function getPitch() {
	pitch.getPitch(function (err, frequency) {
		if (frequency) {
			document.querySelector("#result").textContent = frequency;
		} else {
			document.querySelector("#result").textContent = "No pitch detected";
		}
		getPitch();
	});
}

document.getElementById("startButton")?.addEventListener("click", async () => {
	await Tone.start();
	console.log("audio is ready");
	await setup();
	console.log("setup is ready");
});
