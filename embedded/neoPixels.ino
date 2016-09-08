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

#define DELAY 1000 
int tick = 0;

#define CHASE_SIZE 24
float CHASE[] = {
  1.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 
  0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,
  0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1
};

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

void setup() {
  setupAll();
}

void loop() {
  
  delay(DELAY);
  tick = tick + 1;

  setRingColor(0, 0, 0, 255);
  chase(1, tick, 255, 255, 255);


}

void chase(int ring, int tick, int r, int g, int b) {
  for (int i=0; i < CHASE_SIZE; i++) {
    int index = (tick + i) % CHASE_SIZE;
    float multiplier = CHASE[index];
    int red = int(float(r) * multiplier);
    int green = int(float(g) * multiplier);
    int blue = int(float(b) * multiplier);

    strips[ring].setPixelColor(i, red, green, blue);
    strips[ring].show();
  }
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



