'use strict'

const SerialPort = require("serialport")
const http = require('http')

const serverPort = 8000
// const devicePort = '/dev/tty.usbmodem1421'
const devicePort = '/dev/tty.usbmodem1411'
const baudRate = 9600


// Helpers
//

const requestHandler = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Content-Type', 'application/json')
  // res.setHeader('Access-Control-Allow-Headers', req.header.origin)
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
    port.write(body, (err) => {
      if (err) {
        console.log('Error on write: ', err.message)
        return res.end(JSON.stringify({ error: body + ' failed to write' }))
      }
      res.end(JSON.stringify({ message: body+' was written' }))
    })
  })
}

// Serial Port
//

// open a new connection to the device over the usb
const port = new SerialPort(devicePort, { baudRate })

port.on('open', () => {
  port.write('002;102;202;302;402;602;', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('server started')
  })
  console.log('open!')
})

// open errors will be emitted as an error event
port.on('error', (err) => {
  console.log('Error: ', err.message)
})

// HTTP Server
//

const server = http.createServer(requestHandler)

server.listen(serverPort, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${serverPort}`)
})






