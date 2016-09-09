
void setup()
{
  Serial.begin(9600);
}

void serialEvent()
{
    char c = Serial.read();
    Serial.print(c);
}