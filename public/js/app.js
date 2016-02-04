/* jshint devel: true, browser: true, jquery: true */
/* global io */

$(function() {
  'use strict';

  var socket = io();
  var numbersContainer = $('.js-phone-numbers');

  function log(message) {
    console.log({
        socketId: socket.id,
        message: message
    });
  }

  $('.js-add-phone-number').click(function() {
    log('add phone number');
    socket.emit('add phone number');
  });

  socket.on('add phone number', function(data) {
    if (data.status === 'ok') {
      log('adding sid ' + data.sid);
      numbersContainer.append($(
        '<li class="js-phone-number" data-sid="' + data.sid + '">' +
          data.phoneNumber +
          '<textarea>foo</textarea>' +
          '<button class="js-remove-phone-number" data-sid="' + data.sid +'">-</button>' +
        '</li>'));
    } else {
      log(data.message);
    }
  });

  $('.js-phone-numbers').click(function(event) {
    var $el = $(event.toElement);
    if ($el.hasClass('js-remove-phone-number')) {
      var sid = $el.data('sid');
      log('remove sid ' + sid);
      socket.emit('remove phone number', {
        sid: sid
      });
    }
  });

  socket.on('remove phone number', function(data) {
    if (data.status === 'ok') {
      log('removing sid ' + data.sid);
      numbersContainer
        .find('.js-phone-number')
        .filter('[data-sid=' + data.sid + ']')
        .remove();
    } else {
      log(data.message);
    }
  });
});
