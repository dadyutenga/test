package main

// terminal.go provides terminal manipulation helpers.

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"golang.org/x/term"
)

// GetTerminalSize returns the current terminal width and height.
// Falls back to 80x24 if the size cannot be determined.
func GetTerminalSize() (width, height int) {
	w, h, err := term.GetSize(int(os.Stdout.Fd()))
	if err != nil {
		return 80, 24
	}
	return w, h
}

// ClearScreen clears the terminal using ANSI escape codes.
func ClearScreen() {
	fmt.Print("\033[2J")
}

// MoveCursor moves the cursor to the given row and column (1-based).
func MoveCursor(row, col int) {
	fmt.Printf("\033[%d;%dH", row, col)
}

// HideCursor hides the terminal cursor.
func HideCursor() {
	fmt.Print("\033[?25l")
}

// ShowCursor shows the terminal cursor.
func ShowCursor() {
	fmt.Print("\033[?25h")
}

// WatchResize returns a channel that receives a signal when the terminal is resized.
func WatchResize() <-chan os.Signal {
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, syscall.SIGWINCH)
	return ch
}
