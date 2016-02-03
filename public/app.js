/* jshint devel: true, browser: true, jquery: true */
/* global io */

$(function() {
  'use strict';

  var socket = io();
  var numbersContainer = $('.phone-numbers');

  $('.js-add-phone-number').click(function() {
    console.log('clicked add phone number');
    socket.emit('add phone number');
  });

    $('.phone-numbers').click('.js-remove-phone-number', function() {
    console.log('clicked remove ' + this.dataset.sid);
    socket.emit('remove phone number', {
      sid: $(this).parent()[0].dataset.sid
    });
  });

  socket.on('add phone number', function(data) {
    if (data.status === 'ok') {
      console.log('adding phone number to dom');
      numbersContainer.append($(
        '<li class="phone-number" data-sid="' + data.sid + '">' +
          data.phoneNumber +
          '<button class="js-remove-phone-number">-</button>' +
        '</li>'));
    } else {
      console.log(data.message);
    }
  });

  socket.on('remove phone number', function(data) {
    if (data.status === 'ok') {
      numbersContainer
        .find('.number')
        .filter('[data-sid]=' + data.sid)
        .empty();
    } else {
      console.log(data.message);
    }
  });
});
