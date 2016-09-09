// -----------------------------------
// Controlling LEDs over the Internet
// -----------------------------------

int[] red = {0,255}
int[] green = {0,255}
int[] blue = {0,255}
int counter = 0

void setup()
{
    RGB.control(true);
    Particle.function('toggle', rgbToggle);
}

void loop()
{

}

int rgbToggle (String command) {
    /* Particle.functions always take a string as an argument and return an integer.
    Since we can pass a string, it means that we can give the program commands on how the function should be used.
    In this case, telling the function "on" will turn the LED on and telling it "off" will turn the LED off.
    Then, the function returns a value to us to let us know what happened.
    In this case, it will return 1 for the LEDs turning on, 0 for the LEDs turning off,
    and -1 if we received a totally bogus command that didn't do anything to the LEDs.
    */

    RGB.control(red[counter%2], green[counter%2], blue[counter%2])
    counter++
}