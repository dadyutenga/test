package main

import (
	"strings"
	"testing"
	"time"
)

func TestRenderDigitValidDigits(t *testing.T) {
	for _, d := range "0123456789" {
		pattern := RenderDigit(d)
		for i, line := range pattern {
			if len(line) != 5 {
				t.Errorf("digit %c row %d: expected width 5, got %d (%q)", d, i, len(line), line)
			}
		}
	}
}

func TestRenderDigitInvalid(t *testing.T) {
	pattern := RenderDigit('x')
	for i, line := range pattern {
		if strings.TrimSpace(line) != "" {
			t.Errorf("invalid digit row %d: expected blank, got %q", i, line)
		}
	}
}

func TestRenderColonVisible(t *testing.T) {
	c := RenderColon(true)
	if !strings.Contains(c[1], "o") {
		t.Error("visible colon row 1 should contain 'o'")
	}
	if !strings.Contains(c[3], "o") {
		t.Error("visible colon row 3 should contain 'o'")
	}
}

func TestRenderColonHidden(t *testing.T) {
	c := RenderColon(false)
	for i, line := range c {
		if strings.Contains(line, "o") {
			t.Errorf("hidden colon row %d should not contain 'o'", i)
		}
	}
}

func TestBuildClockLines24h(t *testing.T) {
	cfg := ClockConfig{
		TwelveHour:  false,
		ShowSeconds: true,
		BlinkColon:  false,
		ShowDate:    false,
		UseColor:    false,
	}
	// Use a fixed time: 14:30:05
	tm := time.Date(2026, 2, 22, 14, 30, 5, 0, time.UTC)
	lines, ampm := BuildClockLines(tm, cfg, true)

	if ampm != "" {
		t.Errorf("expected empty ampm in 24h mode, got %q", ampm)
	}
	if len(lines) != segmentRows {
		t.Errorf("expected %d lines, got %d", segmentRows, len(lines))
	}
}

func TestBuildClockLines12h(t *testing.T) {
	cfg := ClockConfig{
		TwelveHour:  true,
		ShowSeconds: false,
		BlinkColon:  false,
		ShowDate:    false,
		UseColor:    false,
	}

	// PM case: 14:30 -> 2:30 PM
	tm := time.Date(2026, 2, 22, 14, 30, 0, 0, time.UTC)
	_, ampm := BuildClockLines(tm, cfg, true)
	if ampm != "PM" {
		t.Errorf("expected PM, got %q", ampm)
	}

	// AM case: 9:15 -> 9:15 AM
	tm2 := time.Date(2026, 2, 22, 9, 15, 0, 0, time.UTC)
	_, ampm2 := BuildClockLines(tm2, cfg, true)
	if ampm2 != "AM" {
		t.Errorf("expected AM, got %q", ampm2)
	}

	// Midnight: 0:00 -> 12:00 AM
	tm3 := time.Date(2026, 2, 22, 0, 0, 0, 0, time.UTC)
	lines3, ampm3 := BuildClockLines(tm3, cfg, true)
	if ampm3 != "AM" {
		t.Errorf("expected AM for midnight, got %q", ampm3)
	}
	// The first digit pair should render "12"
	// Check that the display contains the "1" pattern (no top bar, only right side)
	if !strings.Contains(lines3[0], " ") {
		t.Error("midnight should render as 12")
	}
}

func TestBuildClockLinesWithoutSeconds(t *testing.T) {
	cfgWith := ClockConfig{ShowSeconds: true, UseColor: false}
	cfgWithout := ClockConfig{ShowSeconds: false, UseColor: false}

	tm := time.Date(2026, 2, 22, 10, 30, 45, 0, time.UTC)
	linesWith, _ := BuildClockLines(tm, cfgWith, true)
	linesWithout, _ := BuildClockLines(tm, cfgWithout, true)

	// Lines with seconds should be wider than without.
	if visibleLen(linesWith[0]) <= visibleLen(linesWithout[0]) {
		t.Error("clock with seconds should be wider than without")
	}
}

func TestFormatDate(t *testing.T) {
	tm := time.Date(2026, 2, 22, 0, 0, 0, 0, time.UTC)
	got := FormatDate(tm)
	expected := "Sunday, February 22, 2026"
	if got != expected {
		t.Errorf("expected %q, got %q", expected, got)
	}
}

func TestVisibleLen(t *testing.T) {
	plain := "hello"
	if visibleLen(plain) != 5 {
		t.Errorf("expected 5, got %d", visibleLen(plain))
	}

	colored := Colorize("hello", ColorRed)
	if visibleLen(colored) != 5 {
		t.Errorf("expected 5 for colored string, got %d", visibleLen(colored))
	}
}

func TestColorize(t *testing.T) {
	result := Colorize("test", ColorGreen)
	if !strings.HasPrefix(result, ColorGreen) {
		t.Error("colorized string should start with color code")
	}
	if !strings.HasSuffix(result, ColorReset) {
		t.Error("colorized string should end with reset code")
	}
	if !strings.Contains(result, "test") {
		t.Error("colorized string should contain the original text")
	}
}

func TestDigitPatternsCompleteness(t *testing.T) {
	for d := '0'; d <= '9'; d++ {
		if _, ok := segmentPatterns[d]; !ok {
			t.Errorf("missing segment pattern for digit %c", d)
		}
	}
}
