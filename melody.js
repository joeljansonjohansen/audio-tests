class Line {
	constructor(pitches, durations = []) {
		this.notes = [];
		//What can a melody hold?
		//Monophonic notes with a duration
		//Initializing a melody
		if (pitches.length) {
			for (let i in pitches) {
				this.notes.push(this.createNote(pitches[i], durations[i]));
			}
		}

		//Be able to add notes
		//Add note by interval
		//Be able to remove notes
	}

	addNote(pitch, duration, index = this.notes.length, subdivision, augmentation) {
		this.notes.splice(index, 0, this.createNote(pitch, duration, index, subdivision, augmentation));
		this.updateArray();
	}

	addNoteByInterval(interval, duration, index = this.notes.length, subdivision, augmentation) {
		//Need to add funtionality for rests.
		let lastNoteInLine = this.notes[index - 1] ?? this.createNote();
		let noteToAdd = Tonal.Note.simplify(Tonal.Note.transpose(lastNoteInLine.pitch, interval));
		this.notes.splice(index, 0, this.createNote(noteToAdd, duration, index, subdivision, augmentation));
		this.updateArray();
	}

	createNote(pitch = "C3", duration = "4n", index, subdivision = 2, augmentation = 1) {
		return {
			pitch: pitch,
			pc: Tonal.Note.get(pitch).pc,
			durationInNotation: duration,
			subdivision: 2 / subdivision,
			augmentation: augmentation === 0 ? 1 : augmentation,
			index: index,
			transportPosition: this.notes[index - 1] ? this.notes[index - 1].durationInSeconds + this.notes[index - 1].time : 0,
			get durationInSeconds() {
				return Tone.Time(this.durationInNotation).toSeconds() * this.subdivision * this.augmentation;
			},
			get time() {
				return this.transportPosition;
			},
		};
	}

	updateArray() {
		this.notes.map((note, index) => {
			let position = this.notes[index - 1] ? this.notes[index - 1].durationInSeconds + this.notes[index - 1].time : 0;
			note.transportPosition = position;
		});
	}

	get totalDuration() {
		return this.notes.reduce((sum, note) => {
			return sum + note.durationInSeconds;
		}, 0);
	}

	// durationInSeconds() {
	// 	return Tone.Time(this.durationInNotation).toSeconds();
	// }

	// Functions under developement

	quantizedToScale(scale = "Ab messiaen's mode #1") {
		let tonalScale = Tonal.Scale.get(scale);
		if (!tonalScale) {
			return;
		}
		this.notes.map((note) => {
			let tonalNote = Tonal.Note.get(note.pitch);
			console.log(tonalNote);
			while (!tonalScale.notes.includes(tonalNote.pc)) {
				tonalNote = Tonal.Note.get(Tonal.Note.simplify(Tonal.Note.transpose(tonalNote, "2m")));
			}
			note.pitch = tonalNote.name;
		});
		return this;
	}
}

//const time = Tone.Time("2").toBarsBeatsSixteenths();
// console.log("To bars beats sixteenths: ", time);
// console.log(Tone.Time("16n").toSeconds() * 7);

// for (let i = 0; i < 5; i++) {
// 	let interval = Tonal.Interval.fromSemitones(-6 + Math.floor(Math.random() * 12));
// 	//console.log(interval);
// 	newLine.addNoteByInterval(interval, "4n");
// }
// newLine.addNoteByInterval("P5", "16n");
// newLine.addNoteByInterval("P5", "8n.");
// newLine.addNoteByInterval("P5", "4t");

// //Subdivision solution is maybe not the best.
// //By writing the below you can write triplets and quintuplets etc.

// //For triplets
// newLine.addNoteByInterval("P5", "4n", undefined, 3);
// //For quintuplets
// newLine.addNoteByInterval("P5", "4n", undefined, 5);

//What I wanted to do was to be able to set the length of a note based on a multiplication.
//So "This note is a 16n in duration, multiply it by 7 and use that as the duration".
//This can now be done by using "augmented". So the code below will add 5 quarter note triplets
//newLine.addNoteByInterval("P5", "4n", undefined, 3, 5);
// let newLine = new Line(["Ab4"]);

// for (let index = 0; index < 30; index++) {
// 	if (index % 5 == 0) {
// 		newLine.addNoteByInterval("P5", "16n", undefined, undefined, (index + 1) * 5);
// 	}
// 	if (index % 7 == 0) {
// 		newLine.addNoteByInterval("P5", "16n", undefined, undefined, (index + 1) * 7);
// 	}
// 	if (index % 2 == 0) {
// 		newLine.addNoteByInterval("P5", "16n", undefined, undefined, (index + 1) * 3);
// 	}
// }

// newLine.notes.map((note) => {
// 	console.log("Note: ", note);
// 	console.log("Note.index: ", note.index);
// 	console.log("Note duration in seconds: ", note.durationInSeconds);
// });

//console.log(newLine.notes.filter((note) => note.pc === "Ab"));

//newLine = newLine.quantizedToScale();
