// Required modules
const express = require('express')
// Create an express app
const app = express()
// Create an HTTP server based on the express app
const http = require('http').Server(app)
// Attach Socket.io to the HTTP server
const io = require('socket.io')(http)
const path = require('path')

// Define a default port or fetch from environment variables
const port = process.env.PORT || 8080

// Define the default route for the application. Send the HTML file when accessed.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

// Event listener for a new Socket.io connection
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`) // Log when a user connects

  // Event listener for user disconnect
  socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`))

  // Event listener for messages from the client
  socket.on('clientMessage', (message) =>
    console.log(`Client message "${message}"`)
  )

  // Send a message to the connected client
  socket.emit('serverMessage', 'Hello from server')
})

// Start the HTTP server on the defined port
http.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
