'use strict'

const SerialPort = require("serialport")
const http = require('http')

const serverPort = 8000
const devicePort = 'tty.usbmodem1421'
const baudRate = 9600


// Helpers
//

const requestHandler = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Headers', req.header.origin)
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')


  const url = req.url
  const method = req.method


  console.log(url, method)

  let body = []

  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log(body)

    // ping the serial port

    res.end('Hello Node.js Server!')

  })
}

// Serial Port
//

// open a new connection to the device over the usb
// const port = new SerialPort(devicePort, { baudRate })

// port.on('open', () => {
//   port.write('main screen turn on', (err) => {
//     if (err) {
//       return console.log('Error on write: ', err.message)
//     }
//     console.log('message written')
//   })
// })

// // open errors will be emitted as an error event
// port.on('error', (err) => {
//   console.log('Error: ', err.message)
// })

// HTTP Server
//

const server = http.createServer(requestHandler)

server.listen(serverPort, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${serverPort}`)
})






