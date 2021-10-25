// Enable WebMidi.js
WebMidi.enable(function (err) {
	if (err) {
		console.log("WebMidi could not be enabled.", err);
	}

	// Viewing available inputs and outputs
	console.log(WebMidi.inputs);
	console.log(WebMidi.outputs);

	// Reacting when a new device becomes available
	WebMidi.addListener("connected", function (e) {
		console.log(e);
	});

	// Reacting when a device becomes unavailable
	WebMidi.addListener("disconnected", function (e) {
		console.log(e);
	});

	// Display the current time
	console.log(WebMidi.time);

	// Retrieving an output port/device using its id, name or index
	output = WebMidi.outputs[0];
	input = WebMidi.inputs[0];

	function revoice(note) {
		let semiTone = Tonal.Interval.semitones(note);
		semiTone += Math.abs(Math.round(semiTone / 3));
		return Tonal.Interval.fromSemitones(semiTone);
	}

	let dChordOne = getChordFromVoicing("D4", getVoicingFromIntervals([-1, 4], 6));
	// let dChordTwo = getChordFromVoicing("D4", getVoicingFromIntervals([-1, 2], 4));
	let dChordTwo = getChordFromVoicing("F#4", ["-8P", "-5P", "-3M", "-2m", "3M", "5d", "8P"]);
	let dChordThree = getChordFromVoicing("C#3", ["-8P", "-5P", "-3m", "-2m", "3M", "5P", "8P"]);
	let dChordFour = getChordFromVoicing("Ab4", ["-8P", "-6m", "-4d", "-2M", "3M", "5P", "8P"]);
	let dChordFive = getChordFromVoicing("D4", ["-8P", "-5P", "-3m", "-2m", "3M", "5P", "8P"]);

	let arrayOfChords = [];

	/*
	let initialVoicing = ["-15P", "-8P", "-5P", "5P", "8P"];
	arrayOfChords.push(getChordFromVoicing("C5", initialVoicing));

	let secondVoicing = initialVoicing.map(revoice);
	let thirdVoicing = secondVoicing.map(revoice);
	let fourth = thirdVoicing.map(revoice);
	let fifth = fourth.map(revoice);

	arrayOfChords.push(getChordFromVoicing("C5", secondVoicing));
	arrayOfChords.push(getChordFromVoicing("A4", thirdVoicing));
	arrayOfChords.push(getChordFromVoicing("G4", fourth));
	arrayOfChords.push(getChordFromVoicing("F#4", fifth));
	arrayOfChords.push(getChordFromVoicing("F#4", initialVoicing));

	let pentaVoicing = ["-15P", "-8P", "-4P", "-3m", "2M", "3M", "5P", "6M"];
	arrayOfChords.push(getChordFromVoicing("C5", pentaVoicing));
	arrayOfChords.push(getChordFromVoicing("D#5", pentaVoicing));
	pentaVoicing = pentaVoicing.map((note) => {
		let semiTone = Tonal.Interval.semitones(note);
		semiTone += -24 + Math.round(Math.random() * 3) * 12;
		return Tonal.Interval.fromSemitones(semiTone);
	});
	arrayOfChords.push(getChordFromVoicing("F#4", pentaVoicing));
	pentaVoicing = pentaVoicing.map((note) => {
		let semiTone = Tonal.Interval.semitones(note);
		semiTone += -12 + Math.round(Math.random() * 3) * 12;
		return Tonal.Interval.fromSemitones(semiTone);
	});
	arrayOfChords.push(getChordFromVoicing("E4", pentaVoicing));
	arrayOfChords.push(getChordFromVoicing("G3", pentaVoicing));
	arrayOfChords.push(getChordFromVoicing("G#3", pentaVoicing));
	arrayOfChords.push(getChordFromVoicing("A3", pentaVoicing));

    */

	// arrayOfChords.push(getChordFromVoicing("A3", stack("4P", 6)));
	// arrayOfChords.push(getChordFromVoicing("A3", stack("5P", 6)));
	// arrayOfChords.push(getChordFromVoicing("A3", stack("4P", 6)));
	// arrayOfChords.push(getChordFromVoicing("A3", stack("5P", 6)));
	// arrayOfChords.push(getChordFromVoicing("A3", stack("3M", 6)));
	// arrayOfChords.push(getChordFromVoicing("A3", stack("5P", 6)));
	// arrayOfChords.push(getChordFromVoicing("C#3", stack("5P", 6)));
	// arrayOfChords.push(getChordFromVoicing("G2", stack("4P", 6)));
	// arrayOfChords.push(getChordFromVoicing("Bb0", stack("8P", 6)));

	// arrayOfChords.forEach((chord, index) => {
	// 	chord.forEach((note) => {
	// 		let timing = 1000 + 100 * Math.floor(Math.random() * 60);
	// 		let startOffset = 100 * Math.floor(Math.random() * 15);
	// 		console.log(timing);
	// 		output.playNote(note, 1, { duration: timing, time: "+" + 3000 * index - startOffset });
	// 		output.stopNote(note, 1, { time: "+" + timing });
	// 		//output.playNote(chord, 1, { duration: 1000, time: timing });
	// 	});
	// });

	// let newLine = new Line(["Ab4"]);
	// for (let i = 0; i < 30; i++) {
	// 	let interval = Tonal.Interval.fromSemitones(-6 + Math.floor(Math.random() * 12));
	// 	let duration = 1000 + Math.floor(Math.random() * 3000);
	// 	console.log(interval);
	// 	newLine.addNoteByInterval(interval, duration);
	// }
	// newLine = newLine.quantizedToScale();

	const addNotesToLine = (line, lengthOfLoop, lengthOfNote, octave, chordNote = "Ab", isRoot = false, chosenIndex) => {
		let lastElement = "";
		let arrayOfSteps = [1];
		let currentNote = "";
		console.log("octave = ", octave);

		for (let index = 0; index < lengthOfLoop; index++) {
			let sin = Math.abs(Math.sin((index / lengthOfLoop) * Math.PI * 4).toFixed(2));
			let density = 1 - sin;
			let multiplier = Math.round(1 + density * lengthOfNote);
			//console.log("sin: ", sin);

			let progressOfEntireLength = index / loopLength;

			//let key = sin < 0.25 ? "Ab" : sin < 0.3 ? "Db" : sin < 0.5 ? "Eb" : sin <= 1 ? "F" : "C";
			//let key = sin < 0.1 ? "Ab" : sin < 0.2 ? "Db" : sin < 0.3 ? "F#" : sin < 0.4 ? "B" : sin < 0.5 ? "E" : sin < 0.6 ? "A" : sin < 1 ? "D" : "C";
			//let key = sin < 0.5 ? "Ab" : sin <= 1 ? "Db" : "Ab";

			let key = Tonal.Note.transposeFifths("Ab", Math.floor(progressOfEntireLength * 12));
			// console.log(key);
			let scale =
				progressOfEntireLength < 0.25
					? " pentatonic"
					: progressOfEntireLength < 0.5
					? " pentatonic"
					: progressOfEntireLength < 0.75
					? " pentatonic"
					: progressOfEntireLength > 0.75
					? " pentatonic"
					: " pentatonic";
			arrayOfSteps =
				progressOfEntireLength < 0.25
					? [1]
					: progressOfEntireLength < 0.5
					? [1, 2]
					: progressOfEntireLength < 0.75
					? [-1, 1, 2]
					: progressOfEntireLength > 0.75
					? [-2, -1, 1, 2]
					: [1];

			let startOctave = 1;
			let currentOctave = startOctave;
			if (progressOfEntireLength > 0.1) {
				currentOctave = startOctave + Math.floor(progressOfEntireLength * (octave / startOctave));
				if (octave < startOctave) {
					currentOctave = startOctave - Math.ceil(progressOfEntireLength * (startOctave - octave));
				}
			}

			let rest = sin < 0.5 ? true : false;
			// console.log(key);
			// let notes = Tonal.Scale.get(key + scale).notes;
			let notes = Tonal.Chord.get(key + " maj9").notes;
			// console.log("key + scale: ", key + scale);
			// console.log("notes before: ", notes);
			notes = notes.map((note) => Tonal.Note.get(Tonal.Note.simplify(note)).name);
			// console.log(notes);
			let nextNoteIndex = Math.floor(Math.random() * notes.length);

			if (lastElement != "") {
				let indexOfLastNote = notes.indexOf(Tonal.Note.get(lastElement).pc);
				nextNoteIndex = indexOfLastNote + arrayOfSteps[Math.floor(Math.random() * arrayOfSteps.length)];
				if (nextNoteIndex > notes.length - 1) {
					// octave = octave > 5 ? 5 : octave + 1;
					nextNoteIndex = 0;
				} else if (nextNoteIndex < 0) {
					// octave = octave < 1 ? 1 : octave - 1;
					nextNoteIndex = notes.length - 1;
				}
			}

			nextNoteIndex = isRoot ? 0 : nextNoteIndex;
			if (progressOfEntireLength < 0.52) {
				nextNoteIndex = chosenIndex ?? nextNoteIndex;
			}

			let nextNote = notes[nextNoteIndex] + `${octave}`;

			// console.log("nextnoteindex ", nextNoteIndex);
			// console.log("notes ", notes);
			//console.log("at creation ", currentOctave);
			if (sin > 0.82) {
				currentNote = lastElement == "rest" ? nextNote : lastElement;
			} else {
				lastElement = nextNote;
			}

			nextNote = sin > 0.82 ? currentNote : nextNote;
			// console.log("later on: ", nextNote);
			// console.log("Chordnote: ", currentNote);
			// console.log("octave: ", octave);
			// console.log("index % 6: ", index % 6);

			//nextNote = chordNote + octave;

			//line.addNoteByInterval(randomNote, "16n", undefined, undefined, multiplier);
			line.addNote(rest ? (index % 6 === 0 ? "rest" : nextNote) : nextNote, "8n", undefined, undefined, multiplier);
		}
	};

	let firstLine = new Line(["Ab4"]);
	let secondLine = new Line(["Eb4"]);
	let thirdLine = new Line(["G4"]);
	let fourthLine = new Line(["Bb4"]);
	let fifthLine = new Line(["C2"]);
	let sixthLine = new Line(["Ab1"]);

	//Initial values for
	//let numNotes = 100;
	let numNotes = 160;
	let noteLength = 8;
	let loopLength = Math.round(10 * (numNotes / noteLength));

	addNotesToLine(firstLine, loopLength, noteLength, 4);

	/*
	noteLength = 3;
	loopLength = Math.round(10 * (numNotes / noteLength) * 0.6971830985915493);

	addNotesToLine(secondLine, loopLength, noteLength, 3);

	noteLength = 5;
	loopLength = Math.round(10 * (numNotes / noteLength) * 0.8839285714285714);

	addNotesToLine(thirdLine, loopLength, noteLength, 5);

	noteLength = 7;
	loopLength = Math.round(10 * (numNotes / noteLength) * 0.9519230769230769);

	addNotesToLine(fourthLine, loopLength, noteLength, 3);

    */

	noteLength = 20;
	loopLength = Math.round(10 * (numNotes / noteLength) * 1.1529411764705881);

	addNotesToLine(secondLine, loopLength, noteLength, 5, "Bb", false, 1);
	// console.log("secondLine offset = ", firstLine.totalDuration / secondLine.totalDuration);

	noteLength = 12;
	loopLength = Math.round(10 * (numNotes / noteLength) * 1.0710382513661203);

	addNotesToLine(thirdLine, loopLength, noteLength, 4, "G", false, 4);
	// console.log("thirdLine offset = ", firstLine.totalDuration / thirdLine.totalDuration);

	noteLength = 10;
	loopLength = Math.round(10 * (numNotes / noteLength) * 1.0315789473684212);
	addNotesToLine(fourthLine, loopLength, noteLength, 3, "C", false, 2);

	// console.log("fourthLine offset = ", firstLine.totalDuration / fourthLine.totalDuration);

	noteLength = 15;
	loopLength = Math.round(10 * (numNotes / noteLength) * 1.1511627906976745);

	addNotesToLine(fifthLine, loopLength, noteLength, 2, "Db", false, 3);

	noteLength = 13;
	loopLength = Math.round(10 * (numNotes / noteLength) * 1.125);

	addNotesToLine(sixthLine, loopLength, noteLength, 1, "Ab", true, 0);

	// console.log("newLine totalduration: ", firstLine.totalDuration);
	// console.log("Secondline totalduration: ", secondLine.totalDuration);
	// console.log("first offset = ", firstLine.totalDuration / secondLine.totalDuration);
	// console.log("sixthLine totalduration: ", sixthLine.totalDuration);
	// console.log("second offset = ", firstLine.totalDuration / sixthLine.totalDuration);

	//newLine.quantizedToScale();
	//secondLine.quantizedToScale();

	const playNotes = (line, channel) => {
		line.notes.map((n) => {
			// console.log(`note is: ${n.pitch}`);
			// console.log(`note.transportposition is: ${n.transportPosition}`);
			// console.log(`duration is ${n.durationInSeconds}, n.pitch, n.time`);
			if (n.pitch != "rest") {
				let time = n.transportPosition * 1000;
				let duration = n.durationInSeconds * 1000;
				let combined = time + duration;
				//console.log("time is: ", time + duration);
				output.playNote(n.pitch, channel, { time: "+" + time });
				output.stopNote(n.pitch, channel, { time: "+" + combined });
			}
		});
	};

	playNotes(firstLine, 1);
	playNotes(secondLine, 2);
	playNotes(thirdLine, 3);
	playNotes(fourthLine, 4);
	playNotes(fifthLine, 5);
	playNotes(sixthLine, 6);

	// Play a note at full velocity on all channels)
	//output.playNote(["A3", "D3", "F#3"], 1);
	//output.stopNote(["A3", "D3", "F#3"], 1, { time: "+2500" });
	//output.stopNote(["F#3", "D3", "A3"], 1, { time: "+2000" });

	//To stop all you can write
	//output.stopNote("A3", 1, { time: "+2000" });

	//output.stopNote("F3", { time: "+2000" });
	//output.playNote("Gb2", 10, { duration: 2000, velocity: 0.25 });
	//output.playNote("F4", 1, { duration: 2000, time: "+2000" });
	// Play a note on channel 16 in 2 seconds (relative time)
	//output.playNote("F5", 16, {time: "+2000"});

	// Play a note on channel 1 at an absolute time in the future
	//output.playNote("F5", 16, {time: WebMidi.time + 3000});

	// Play a note for a duration of 2 seconds (will send a note off message in 2 seconds). Also use
	// a low attack velocity
	//output.playNote("Gb2", 10, { duration: 2000, velocity: 0.25 });

	// Stop a playing note on all channels
	//utput.stopNote("C-1");

	// Listen for a 'note on' message on all channels
	input.addListener("noteon", "all", function (e) {
		console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ")." + e.channel);
	});

	// Listen for a 'note on' message on all channels
	input.addListener("noteoff", "all", function (e) {
		console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ")." + e.channel);
	});
});

/*
// Enable WebMidi.js
WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);
  
  // Reacting when a new device becomes available
  WebMidi.addListener("connected", function(e) {
    console.log(e);
  });
  
  // Reacting when a device becomes unavailable
  WebMidi.addListener("disconnected", function(e) {
    console.log(e);
  });

  // Display the current time
  console.log(WebMidi.time);

  // Retrieving an output port/device using its id, name or index
  var output = WebMidi.getOutputById("123456789");
  output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  output = WebMidi.outputs[0];

  // Play a note on all channels of the selected output
  output.playNote("C3");

  // Play a note on channel 3
  output.playNote("Gb4", 3);

  // Play a chord on all available channels
  output.playNote(["C3", "D#3", "G3"]);

  // Play a chord on channel 7
  output.playNote(["C3", "D#3", "G3"], 7);

  // Play a note at full velocity on all channels)
  output.playNote("F#-1", "all", {velocity: 1});

  // Play a note on channel 16 in 2 seconds (relative time)
  output.playNote("F5", 16, {time: "+2000"});

  // Play a note on channel 1 at an absolute time in the future
  output.playNote("F5", 16, {time: WebMidi.time + 3000});

  // Play a note for a duration of 2 seconds (will send a note off message in 2 seconds). Also use
  // a low attack velocity
  output.playNote("Gb2", 10, {duration: 2000, velocity: 0.25});

  // Stop a playing note on all channels
  output.stopNote("C-1");

  // Stopping a playing note on channel 11
  output.stopNote("F3", 11);

  // Stop a playing note on channel 11 and use a high release velocity
  output.stopNote("G8", 11, {velocity: 0.9});

  // Stopping a playing note in 2.5 seconds
  output.stopNote("Bb2", 11, {time: "+2500"});

  // Send polyphonic aftertouch message to channel 8
  output.sendKeyAftertouch("C#3", 8, 0.25);

  // Send pitch bend (between -1 and 1) to channel 12
  output.sendPitchBend(-1, 12);

  // You can chain most method calls
  output.playNote("G5", 12)
    .sendPitchBend(-0.5, 12, {time: 400}) // After 400 ms.
    .sendPitchBend(0.5, 12, {time: 800})  // After 800 ms.
    .stopNote("G5", 12, {time: 1200});    // After 1.2 s.

  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
  input = WebMidi.getInputById("1809568182");
  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
    }
  );

  // Listen to pitch bend message on channel 3
  input.addListener('pitchbend', 3,
    function (e) {
      console.log("Received 'pitchbend' message.", e);
    }
  );

  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      console.log("Received 'controlchange' message.", e);
    }
  );
  
  // Listen to NRPN message on all channels
  input.addListener('nrpn', "all",
    function (e) {
      if(e.controller.type === 'entry') {
        console.log("Received 'nrpn' 'entry' message.", e);
      }
      if(e.controller.type === 'decrement') {
        console.log("Received 'nrpn' 'decrement' message.", e);
      }
      if(e.controller.type === 'increment') {
        console.log("Received 'nrpn' 'increment' message.", e);
      }
      console.log("message value: " + e.controller.value + ".", e);
    }
  );

  // Check for the presence of an event listener (in such cases, you cannot use anonymous functions).
  function test(e) { console.log(e); }
  input.addListener('programchange', 12, test);
  console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove a specific listener
  input.removeListener('programchange', 12, test);
  console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove all listeners of a specific type on a specific channel
  input.removeListener('noteoff', 12);

  // Remove all listeners for 'noteoff' on all channels
  input.removeListener('noteoff');

  // Remove all listeners on the input
  input.removeListener();

});

*/
