// -----------------------------------
// Controlling LEDs over the Internet
// -----------------------------------

int red[] = {0,255};
int green[] = {0,255};
int blue[] = {0,255};
int counter = 0;

/*int rgbToggle (String command) {
     Particle.functions always take a string as an argument and return an integer.
    Since we can pass a string, it means that we can give the program commands on how the function should be used.
    In this case, telling the function "on" will turn the LED on and telling it "off" will turn the LED off.
    Then, the function returns a value to us to let us know what happened.
    In this case, it will return 1 for the LEDs turning on, 0 for the LEDs turning off,
    and -1 if we received a totally bogus command that didn't do anything to the LEDs.
    

    RGB.color(red[counter%2], green[counter%2], blue[counter%2]);
    if (counter % 2 == 0) {
        digitalWrite(D0, LOW);
    } else {
        digitalWrite(D0, HIGH);
    }
    counter++;
    return 0;
}*/

void setup() {
    pinMode(D0, OUTPUT);
    digitalWrite(D0, HIGH);
    RGB.control(true);
    RGB.color(0, 255, 0);
    Particle.function("toggle", rgbToggle);
}

void loop() {}




/*// for each rign:
state is one of ON, OFF, FADE_UP, FADE_DOWN, CHASE
color (r, g, b)
stateStart // a tick at which the state started: tick - stateStart is used to index an array

setled(ring, led)


// loop()
for each ring, 


// set a refresh wait with delay()

increment a tick int each loop*/
