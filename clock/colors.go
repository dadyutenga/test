package main

// colors.go provides ANSI color utilities for terminal output.

import "fmt"

// ANSI color codes.
const (
	ColorReset  = "\033[0m"
	ColorRed    = "\033[91m" // bright red
	ColorGreen  = "\033[92m" // bright green
	ColorYellow = "\033[93m" // bright yellow
	ColorBlue   = "\033[94m" // bright blue
	ColorCyan   = "\033[96m" // bright cyan
	ColorWhite  = "\033[97m" // bright white
)

// Colorize wraps text in the given ANSI color code and resets afterward.
func Colorize(text, color string) string {
	return fmt.Sprintf("%s%s%s", color, text, ColorReset)
}
