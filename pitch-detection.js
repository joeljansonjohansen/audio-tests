// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

let pitch;
const ampEnv = new Tone.AmplitudeEnvelope({
	attack: 0.1,
	decay: 0.2,
	sustain: 1.0,
	release: 0.8,
}).toDestination();
let osc = new Tone.Oscillator(200, "sine").connect(ampEnv).start();

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
			console.log("mic not open", e);
		});
}

function startPitch(stream, audioContext) {
	pitch = ml5.pitchDetection("./model/", audioContext, stream, modelLoaded);
}

function modelLoaded() {
	document.querySelector("#status").textContent = "Model Loaded";
	getPitch();
}

let timeSinceStopped = 0;
let wait = false;

function getPitch() {
	pitch.getPitch(function (err, frequency) {
		if (frequency) {
			document.querySelector("#result").textContent = frequency;
			if (timeSinceStopped > 50 && !wait) {
				osc.frequency.rampTo(frequency, 0.2);
				// ampEnv.triggerAttackRelease("8n");
				//wait = true;
				ampEnv.triggerAttack("+0.1");
			}
			timeSinceStopped += 1;
		} else {
			ampEnv.triggerRelease("+0.1");
			wait = false;
			document.querySelector("#result").textContent = "No pitch detected";
			timeSinceStopped = 0;
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
