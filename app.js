const express = require('express');
const app = express();

// set the template engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.render('index');
});

// app listening on port XXXX
server = app.listen(3000);

// instantiate socket.io
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('New user connected');
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.username = 'Anonymous';

  // listen for new usernames
  socket.on('change_username', (data) => {
    socket.username = data.username;
  });

  socket.on('new_message', (data) => {
    // broadcast the new message
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username,
    });
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { username: socket.username });
  });
});
