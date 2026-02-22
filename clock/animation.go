package main

// animation.go provides a startup animation for the clock.

import (
	"fmt"
	"time"
)

// StartupAnimation plays a brief segment-lighting animation.
func StartupAnimation(termWidth, termHeight int, useColor bool) {
	digits := []rune{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'}

	for _, d := range digits {
		pattern := RenderDigit(d)
		startRow := (termHeight - segmentRows) / 2
		startCol := (termWidth - 5) / 2
		if startRow < 1 {
			startRow = 1
		}
		if startCol < 1 {
			startCol = 1
		}

		for i := 0; i < segmentRows; i++ {
			MoveCursor(startRow+i, startCol)
			line := pattern[i]
			if useColor {
				line = Colorize(line, ColorCyan)
			}
			fmt.Print(line)
			fmt.Print("\033[K")
		}
		time.Sleep(80 * time.Millisecond)
	}
}
