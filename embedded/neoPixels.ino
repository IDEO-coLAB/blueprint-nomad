/*
 * This is a RGB+W NeoPixel example, see extra-examples.cpp for a version
 * with more explantory documentation, example routines, how to
 * hook up your pixels and all of the pixel types that are supported.
 *
 */

/* ======================= includes ================================= */

#include "application.h"
// #include "neopixel/neopixel.h" // use for Build IDE
#include "neopixel.h" // use for local build

/* ======================= prototypes =============================== */

uint32_t Wheel(byte WheelPos);
uint8_t red(uint32_t c);
uint8_t green(uint32_t c);
uint8_t blue(uint32_t c);
void colorWipe(uint32_t c, uint8_t wait);
void pulseWhite(uint8_t wait);
void rainbowFade2White(uint8_t wait, int rainbowLoops, int whiteLoops);
void whiteOverRainbow(uint8_t wait, uint8_t whiteSpeed, uint8_t whiteLength);
void fullWhite();
void rainbowCycle(uint8_t wait);
void rainbow(uint8_t wait);

/* ======================= rgbw-strandtest.cpp ====================== */

SYSTEM_MODE(AUTOMATIC);

// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_PIN D0
#define PIXEL_COUNT 24
#define PIXEL_TYPE WS2812B
#define BRIGHTNESS 80 // 0 - 255

#define NUM_RINGS 7
Adafruit_NeoPixel strips[] = {
  Adafruit_NeoPixel(PIXEL_COUNT, D0, PIXEL_TYPE),
  Adafruit_NeoPixel(PIXEL_COUNT, D1, PIXEL_TYPE),
  Adafruit_NeoPixel(PIXEL_COUNT, D2, PIXEL_TYPE),
  Adafruit_NeoPixel(PIXEL_COUNT, D3, PIXEL_TYPE),
  Adafruit_NeoPixel(PIXEL_COUNT, D4, PIXEL_TYPE),
  Adafruit_NeoPixel(PIXEL_COUNT, D5, PIXEL_TYPE),
  Adafruit_NeoPixel(PIXEL_COUNT, D6, PIXEL_TYPE),
};

#define DELAY 50 
int tick = 0;

void setup() {
  setupAll();
}

void loop() {
  
  delay(DELAY);
  tick = tick + 1;
  setRingColor(0, 0, 0, 255);
  setRingColor(1, 0, 0, 255);
  setRingColor(2, 0, 0, 255);
  setRingColor(3, 0, 0, 255);


}

void setRingColor(int ring, int r, int g, int b) {
  for (int i=0; i < 24; i++) {
    strips[ring].setPixelColor(i, r, g, b);
    strips[ring].show();
  }
}

void setupAll() {
  for (int i=0; i < NUM_RINGS; i++) {
    strips[i].setBrightness(BRIGHTNESS);
    strips[i].begin();
    strips[i].show(); // Initialize all pixels to 'off'
  }
}



