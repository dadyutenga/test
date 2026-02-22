package main

// render.go composes the full clock display from segments, colors, and layout.

import (
	"fmt"
	"strings"
	"time"
)

// ClockConfig holds runtime configuration for the clock display.
type ClockConfig struct {
	TwelveHour   bool // use 12-hour format
	ShowSeconds  bool // display seconds
	BlinkColon   bool // blink the colon separators
	ShowDate     bool // display date below the clock
	UseColor     bool // enable ANSI colors
}

// BuildClockLines builds the 5-line ASCII representation of the given time.
// It returns the lines and the AM/PM indicator (empty string in 24h mode).
func BuildClockLines(t time.Time, cfg ClockConfig, colonVisible bool) ([]string, string) {
	hour, min, sec := t.Hour(), t.Minute(), t.Second()

	ampm := ""
	if cfg.TwelveHour {
		if hour >= 12 {
			ampm = "PM"
		} else {
			ampm = "AM"
		}
		hour = hour % 12
		if hour == 0 {
			hour = 12
		}
	}

	hourStr := fmt.Sprintf("%02d", hour)
	minStr := fmt.Sprintf("%02d", min)
	secStr := fmt.Sprintf("%02d", sec)

	// Collect digit patterns per row.
	lines := make([]string, segmentRows)
	for row := 0; row < segmentRows; row++ {
		var parts []string

		// Hours
		h1 := RenderDigit(rune(hourStr[0]))
		h2 := RenderDigit(rune(hourStr[1]))
		hourPart := h1[row] + " " + h2[row]
		if cfg.UseColor {
			hourPart = Colorize(hourPart, ColorCyan)
		}
		parts = append(parts, hourPart)

		// Colon
		c1 := RenderColon(colonVisible)
		colonPart := c1[row]
		if cfg.UseColor {
			colonPart = Colorize(colonPart, ColorWhite)
		}
		parts = append(parts, colonPart)

		// Minutes
		m1 := RenderDigit(rune(minStr[0]))
		m2 := RenderDigit(rune(minStr[1]))
		minPart := m1[row] + " " + m2[row]
		if cfg.UseColor {
			minPart = Colorize(minPart, ColorGreen)
		}
		parts = append(parts, minPart)

		if cfg.ShowSeconds {
			// Colon
			c2 := RenderColon(colonVisible)
			colonPart2 := c2[row]
			if cfg.UseColor {
				colonPart2 = Colorize(colonPart2, ColorWhite)
			}
			parts = append(parts, colonPart2)

			// Seconds
			s1 := RenderDigit(rune(secStr[0]))
			s2 := RenderDigit(rune(secStr[1]))
			secPart := s1[row] + " " + s2[row]
			if cfg.UseColor {
				secPart = Colorize(secPart, ColorYellow)
			}
			parts = append(parts, secPart)
		}

		lines[row] = strings.Join(parts, "")
	}

	return lines, ampm
}

// FormatDate returns a simple date string for display below the clock.
func FormatDate(t time.Time) string {
	return t.Format("Monday, January 2, 2006")
}

// DrawClock renders the full clock display centered in the terminal.
func DrawClock(t time.Time, cfg ClockConfig, colonVisible bool, termWidth, termHeight int) {
	lines, ampm := BuildClockLines(t, cfg, colonVisible)

	// Calculate visible width of the first line (strip ANSI codes for measurement).
	visibleWidth := visibleLen(lines[0])

	// Total height: clock lines + optional date + optional AM/PM label.
	totalHeight := segmentRows
	if cfg.ShowDate {
		totalHeight += 2 // blank line + date
	}
	if ampm != "" {
		totalHeight++ // AM/PM label line
	}

	startRow := (termHeight - totalHeight) / 2
	if startRow < 1 {
		startRow = 1
	}
	startCol := (termWidth - visibleWidth) / 2
	if startCol < 1 {
		startCol = 1
	}

	for i, line := range lines {
		MoveCursor(startRow+i, startCol)
		fmt.Print(line)
		// Clear rest of the line to avoid leftover characters on resize.
		fmt.Print("\033[K")
	}

	row := startRow + segmentRows

	if ampm != "" {
		label := ampm
		if cfg.UseColor {
			label = Colorize(label, ColorRed)
		}
		labelCol := startCol + visibleWidth - len(ampm)
		if labelCol < 1 {
			labelCol = 1
		}
		MoveCursor(row, labelCol)
		fmt.Print(label)
		fmt.Print("\033[K")
		row++
	}

	if cfg.ShowDate {
		dateStr := FormatDate(t)
		if cfg.UseColor {
			dateStr = Colorize(dateStr, ColorBlue)
		}
		dateCol := (termWidth - len(FormatDate(t))) / 2
		if dateCol < 1 {
			dateCol = 1
		}
		MoveCursor(row+1, dateCol)
		fmt.Print(dateStr)
		fmt.Print("\033[K")
	}
}

// visibleLen returns the length of a string with ANSI escape codes removed.
func visibleLen(s string) int {
	n := 0
	inEscape := false
	for _, r := range s {
		if r == '\033' {
			inEscape = true
			continue
		}
		if inEscape {
			if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') {
				inEscape = false
			}
			continue
		}
		n++
	}
	return n
}
