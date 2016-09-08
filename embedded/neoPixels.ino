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

// #define DELAY 50 // good for slower
#define DELAY 25 
int fastTick = 0;
int slowTick = 0;

#define CHASE_SIZE 3
// float CHASE[] = {
//   1.0, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 
//   0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,
//   0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5
// };

int chaseColor1Red[] =   { 10, 15, 30, 15, 10 };
int chaseColor1Green[] = { 10, 15, 30, 15, 10 };
int chaseColor1Blue[] =  { 10, 15, 30, 15, 10 };

int chaseColor2Red[] =    { 10, 15, 30, 15, 10 };
int chaseColor2Green[] =  { 0,  0,  0,  0,  0 };
int chaseColor2Blue[] =   { 10, 15, 30, 15, 10 };

#define FAST_1 0
#define FAST_2 1
#define SLOW_1 2
#define SLOW_2 3
#define OFF 4

int ringState[] = {FAST_1, OFF, OFF, OFF, OFF, OFF, OFF};

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
  fastTick = fastTick + 1;
  if (fastTick % 2 == 0) {
    slowTick = slowTick + 1;
  }

  chase(0, fastTick, 0);
  chase(1, slowTick, 0);
  chase(2, fastTick, 0);
  chase(3, slowTick, 0);
  chase(4, fastTick, 0);
  chase(5, fastTick, 0);
  chase(6, fastTick, 0);
}

void chase(int ring, int tick, int state) {
  for (int i=0; i < 5; i++) {
    int pixel = (tick + i) % 24;
    int color = chaseColor1Red[i];

    strips[ring].setPixelColor(pixel, color, color, color);
  }
  strips[ring].show();
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



