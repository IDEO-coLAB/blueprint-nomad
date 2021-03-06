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

#define COLORS_SIZE 5
/* 2 color palettes x 5 pixels x rgb */
/*  Node: alert = 2, normal = 1
    Interactive Node: alert = 4, normal = 3
*/
int colors[5][5][3] = {
  { {0, 0, 0}, {0, 0, 0}, {0, 0, 0}, {0, 0, 0}, {0, 0, 0 } },  
   { {0, 0, 5}, {0, 0, 10}, {0, 0, 15}, {0, 0, 10}, {0, 0, 5} },        
  { {5, 0, 0}, {10, 0, 0}, {15, 0, 0}, {10, 5, 0}, {5, 0, 0} },        
  { {0, 0, 10}, {0, 0, 10}, {0, 0, 10}, {0, 0, 10}, {0, 0, 10} },     
  { {10, 0, 0}, {10, 0, 0}, {10, 0, 0}, {10, 0, 0}, {10, 0, 0} }       
};

int ringColor[] = {3, 3, 3, 3, 3, 0, 3};
int ringSpeed[] = {0, 1, 0, 1, 0, 1, 0};


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

int message(String msg) {
  /* a message '3,0,1' means set ring 3 to be slow with color 1 */
  int ring = msg.substring(0, 1).toInt();
  int speed = msg.substring(1, 2).toInt();
  int color = msg.substring(2, 3).toInt();

  ringColor[ring] = color;
  ringSpeed[ring] = speed;
  return 1;
}

void setup() {
  setupAll();
  Serial.begin(9600);
  Particle.function("message", message);
}

void loop() {

  delay(DELAY);
  fastTick = fastTick + 1;
  if (fastTick % 2 == 0) {
    slowTick = slowTick + 1;
  }

  int ticks[] = {slowTick, fastTick};

  for (int i=0; i < NUM_RINGS; i++) {
    chase(i, ticks[ringSpeed[i]], ringColor[i]);
  }
}

String serialMessage = "";
void serialEvent()
{
    char c = Serial.read();
    Serial.print(c);
    if (c == ';') {
      message(serialMessage);
      serialMessage = "";
    } else {
      serialMessage.concat(String(c));
    }
}

void chase(int ring, int tick, int colorSelector) {
  int red = 0; int green = 0; int blue = 0;

  for (int i=0; i < COLORS_SIZE; i++) {
    int pixel = (tick + i) % 24;

    int red = colors[colorSelector][i][0];
    int green = colors[colorSelector][i][1];
    int blue = colors[colorSelector][i][2];

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



