// let key = Tonal.Key.majorKey("Ab");
// console.log(key);
// console.log(key.chords);
// let array = key.chords.map((chord) => Tonal.Chord.get(Tonal.Chord.transpose(chord, "m2")));
// array.forEach((element) => console.log(element.name));
// console.log(Tonal.Progression.toRomanNumerals("Ab", key.chords));
// let allIntervalChord = ["C", "D#", "E", "Gb"];
// //console.log(Tonal.Collection.permutations(allIntervalChord));
// allIntervalChord.forEach((note) => console.log(note + Math.round(Math.random() * 3)));

/*  
This function wants a note from which to voice from
and then a voicing. This voicing is an array consisting
of intervals and direction. Eg. [-3m, 3M] will add a minor 
third below the note and a major above.
*/
function getChordFromVoicing(note, voicing) {
	if (!Array.isArray(voicing)) {
		throw "Error - voicing must be of type Array";
	}
	let chord = voicing.map((vn, i) => Tonal.transpose(note, voicing[i]));
	return chord;
}

/*  
Range might look like this [-1, 4] - this means
in the middle we will have 0 and below we will have
minor seconds and above major 3. Size is how many
notes that will be added on each side.
Returns intervals according to Tonal.js.
*/
function getVoicingFromIntervals(range, size) {
	if (size <= 0) {
		return `Error: Size ${size} must be positive.`;
	}

	let voicing = [];
	for (let i = 0; i < size; i++) {
		voicing.push(range[0] * (i + 1));
		voicing.push(range[1] * (i + 1));
	}
	voicing.push(0);
	voicing.sort((a, b) => a - b);
	let intervalMap = voicing.map((note) => Tonal.Interval.fromSemitones(note));
	return intervalMap;
}

/*
This funnction returns an array of intervals that are multiplied n times.
So if we want a stack of 4 major thirds, we say stack("3M", 4);
*/
function stack(interval, n) {
	let array = Array(n);
	array.fill(interval);
	return array.map((n, i) => Tonal.Interval.fromSemitones(Tonal.Interval.semitones(n) * (i + 1)));
}
