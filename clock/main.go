package main

// main.go is the entry point for the ASCII 7-segment digital clock.

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"time"
)

func main() {
	// Command-line flags.
	twelveHour := flag.Bool("12", false, "Use 12-hour format")
	hideSeconds := flag.Bool("no-seconds", false, "Hide seconds display")
	noBlink := flag.Bool("no-blink", false, "Disable colon blinking")
	noDate := flag.Bool("no-date", false, "Hide date display")
	noColor := flag.Bool("no-color", false, "Disable color output")
	noAnimation := flag.Bool("no-animation", false, "Skip startup animation")
	flag.Parse()

	cfg := ClockConfig{
		TwelveHour:  *twelveHour,
		ShowSeconds: !*hideSeconds,
		BlinkColon:  !*noBlink,
		ShowDate:    !*noDate,
		UseColor:    !*noColor,
	}

	// Setup: hide cursor, clear screen.
	HideCursor()
	ClearScreen()

	// Ensure cursor is restored on exit.
	exitCh := make(chan os.Signal, 1)
	signal.Notify(exitCh, os.Interrupt)
	go func() {
		<-exitCh
		ShowCursor()
		MoveCursor(999, 1) // Move cursor to bottom.
		fmt.Println()
		os.Exit(0)
	}()

	termWidth, termHeight := GetTerminalSize()

	// Optional startup animation.
	if !*noAnimation {
		StartupAnimation(termWidth, termHeight, cfg.UseColor)
		time.Sleep(200 * time.Millisecond)
		ClearScreen()
	}

	// Watch for terminal resize.
	resizeCh := WatchResize()

	// Main loop: tick every 500ms to support colon blink toggling.
	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	colonVisible := true
	lastSecond := -1

	// Initial draw.
	now := time.Now()
	DrawClock(now, cfg, colonVisible, termWidth, termHeight)
	lastSecond = now.Second()

	for {
		select {
		case <-ticker.C:
			now := time.Now()
			currentSecond := now.Second()

			if cfg.BlinkColon {
				colonVisible = !colonVisible
			} else {
				colonVisible = true
			}

			// Redraw if the second changed or colon blink toggled.
			if currentSecond != lastSecond || cfg.BlinkColon {
				DrawClock(now, cfg, colonVisible, termWidth, termHeight)
				lastSecond = currentSecond
			}

		case <-resizeCh:
			termWidth, termHeight = GetTerminalSize()
			ClearScreen()
			now := time.Now()
			DrawClock(now, cfg, colonVisible, termWidth, termHeight)
		}
	}
}
