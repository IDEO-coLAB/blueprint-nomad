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
#define DELAY 12 
int fastTick = 0;
int slowTick = 0;

#define CHASE_SIZE 3
// float CHASE[] = {
//   1.0, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 
//   0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,
//   0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5
// };

#define COLORS_SIZE 5
int chaseColor1Red[] =   { 10, 15, 30, 15, 10 };
int chaseColor1Green[] = { 10, 15, 30, 15, 10 };
int chaseColor1Blue[] =  { 10, 15, 30, 15, 10 };

int chaseColor2Red[] =    { 10, 15, 30, 15, 10 };
int chaseColor2Green[] =  { 0,  0,  0,  0,  0 };
int chaseColor2Blue[] =   { 10, 15, 30, 15, 10 };

const int FAST_1 = 0;
const int FAST_2 = 1;
const int SLOW_1 = 2;
const int SLOW_2 = 3;
const int OFF = 4;

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
  
  // delay(DELAY);
  fastTick = fastTick + 1;
  if (fastTick % 2 == 0) {
    slowTick = slowTick + 1;
  }

  for (int i=0; i < NUM_RINGS; i++) {
    int state = ringState[i];
    if (state == SLOW_1) {
      chase(i, slowTick, SLOW_1);
    } 

    else if (state == SLOW_2) {
      chase(i, slowTick, SLOW_2);
    } 

    else if (state == FAST_1) {
      chase(i, fastTick, FAST_1);
    } 

    else if (state == FAST_2) {
      chase(i, fastTick, FAST_2);
    } 

    else {
      setRingColor(i, 0, 0, 0);
    }
  }
}

void chase(int ring, int tick, int state) {
  int red = 0; int green = 0; int blue = 0;
  
  for (int i=0; i < COLORS_SIZE; i++) {
    int pixel = (tick + i) % 24;
    if (state == FAST_1 || state == SLOW_1) {
      red = chaseColor1Red[i];
      green = chaseColor1Green[i];
      blue = chaseColor1Blue[i];
    } else {
      red = chaseColor2Red[i];
      green = chaseColor2Green[i];
      blue = chaseColor2Blue[i];
    }
    strips[ring].setPixelColor(pixel, red, green, blue);
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



