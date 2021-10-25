function playNote() {
	const player = new Tone.Player({
		url: "AnotherSun-gold.wav",
		autostart: true,
	});
	const filter = new Tone.Filter(500, "highpass");
	const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5);
	const pitchShift = new Tone.PitchShift(-12);
	pitchShift.wet = 0.5;
	const vibrato = new Tone.Vibrato(0.9, 1);

	// connect the player to the feedback delay and filter in parallel
	//player.connect(filter);
	//player.connect(feedbackDelay);

	//Chaining means connecting them to eachother in succession
	player.chain(pitchShift, filter, feedbackDelay, vibrato, Tone.Destination);
}

function playSawTooth() {
	//This creates a channel that can be used for panning
	const channel = new Tone.Channel({ pan: -1, volume: 0 }).toDestination();

	const tremolo = new Tone.Tremolo(9, 0.45).start();
	const vibrato = new Tone.Vibrato(3, 1.0);
	//The reverb
	const reverb = new Tone.Reverb(10);
	const lfo = new Tone.LFO(0.2, 100, 150).start();
	const panlfo = new Tone.LFO(0.5, -1, 1).start();

	// route an oscillator through the tremolo and start it
	const filter = new Tone.Filter(100, "lowpass");
	lfo.connect(filter.frequency);
	const noise = new Tone.Noise("white").connect(filter).start().stop("+5");
	const osc = new Tone.Oscillator(150, "sawtooth").chain(vibrato, tremolo, filter).start().stop("+5");
	const osc2 = new Tone.Oscillator(300, "sawtooth").chain(filter).start().stop("+5");
	//lfo.frequency.rampTo(20, 10);
	const osc3 = new Tone.Oscillator(60, "sawtooth").chain(filter).start("+0.5").stop("+5");

	//The filter is connected to the channel since it's the last in the chains above. Same thing with the reverb.
	//How does this work in though?
	filter.connect(reverb);
	//vibrato.connect(channel);
	//tremolo.connect(channel);
	reverb.connect(channel);
	panlfo.connect(channel.pan);
	//channel.pan.rampTo(1, 5);
	//channel.chain(noise, osc, osc2, osc3);
	// noise.connect(channel);
	// channel.mute = true;
}

//attach a click listener to a play button
document.getElementById("startButton")?.addEventListener("click", async () => {
	await Tone.start();
	console.log("audio is ready");
});

// function makeChannel(channel, name, url, pan) {
// 	const player = new Tone.Player({
// 		url: `https://tonejs.github.io/audio/berklee/${url}.mp3`,
// 		loop: true,
// 	})
// 		.sync()
// 		.start(0);
// 	player.connect(channel);
// }

// const channel = new Tone.Channel({
// 	pan: 0,
// 	volume: 0,
// }).toDestination();

// makeChannel(channel, "Guitar 0", "comping1", 1);
// makeChannel(channel, "Guitar 1", "comping2", -1);
// makeChannel(channel, "Guitar 2", "comping3", 0.25);
// makeChannel(channel, "Guitar 3", "comping4", -0.25);

// Tone.Transport.start();
// channel.volume.rampTo(-60, 10);
