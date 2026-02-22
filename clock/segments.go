package main

// segments.go defines 7-segment ASCII digit patterns and rendering helpers.

// Each digit is represented as a 5-row x 3-column grid of segments.
// A segment is either on (" " for off) or uses box-drawing characters.
// Rows: top bar, upper sides, middle bar, lower sides, bottom bar.
//
// Layout reference:
//  ___
// |   |
// |___|
// |   |
// |___|

// segmentPatterns maps each digit (0-9) to its 5-line ASCII representation.
// Each line is exactly 5 characters wide for consistent alignment.
var segmentPatterns = map[rune][5]string{
	'0': {
		" ___ ",
		"|   |",
		"|   |",
		"|   |",
		"|___|",
	},
	'1': {
		"     ",
		"    |",
		"    |",
		"    |",
		"    |",
	},
	'2': {
		" ___ ",
		"    |",
		" ___|",
		"|    ",
		"|___ ",
	},
	'3': {
		" ___ ",
		"    |",
		" ___|",
		"    |",
		" ___|",
	},
	'4': {
		"     ",
		"|   |",
		"|___|",
		"    |",
		"    |",
	},
	'5': {
		" ___ ",
		"|    ",
		"|___ ",
		"    |",
		" ___|",
	},
	'6': {
		" ___ ",
		"|    ",
		"|___ ",
		"|   |",
		"|___|",
	},
	'7': {
		" ___ ",
		"    |",
		"    |",
		"    |",
		"    |",
	},
	'8': {
		" ___ ",
		"|   |",
		"|___|",
		"|   |",
		"|___|",
	},
	'9': {
		" ___ ",
		"|   |",
		"|___|",
		"    |",
		" ___|",
	},
}

// colonPattern represents the colon separator between digit groups.
var colonPattern = [5]string{
	"   ",
	" o ",
	"   ",
	" o ",
	"   ",
}

// colonBlankPattern is used for the blink-off phase of the colon.
var colonBlankPattern = [5]string{
	"   ",
	"   ",
	"   ",
	"   ",
	"   ",
}

// segmentRows is the number of rows in each digit pattern.
const segmentRows = 5

// RenderDigit returns the 5-line pattern for a given digit rune.
// Returns a blank pattern if the rune is not a valid digit.
func RenderDigit(r rune) [5]string {
	if p, ok := segmentPatterns[r]; ok {
		return p
	}
	return [5]string{"     ", "     ", "     ", "     ", "     "}
}

// RenderColon returns the colon pattern, optionally blank for blink effect.
func RenderColon(visible bool) [5]string {
	if visible {
		return colonPattern
	}
	return colonBlankPattern
}
