$(function () {
  // client logs and boom, connection
  var socket = io.connect('http://localhost:3000');

  // inputs on frontend
  var message = $('#message');
  var username = $('#username');
  var send_message = $('#send_message');
  var send_username = $('#send_username');
  var chatroom = $('#chatroom');
  var feedback = $('#feedback');

  // emit message to server
  send_message.click(function () {
    socket.emit('new_message', { message: message.val() });
  });

  // listen on new message | only ???
  socket.on('new_message', (data) => {
    feedback.html('');
    message.val('');
    chatroom.append(
      "<p class='message'>" + data.username + ': ' + data.message + '</p>'
    );
  });

  // emit a username to server
  send_username.click(function () {
    socket.emit('change_username', { username: username.val() });
  });

  // emit whose typing
  message.bind('keypress', () => {
    socket.emit('typing');
  });

  //Listen on typing
  socket.on('typing', (data) => {
    feedback.html(
      '<p><i>' + data.username + ' is typing a message...' + '</i></p>'
    );
  });
});
