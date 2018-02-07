// 'use strict';

var socket = io.connect('http://localhost:3000');

var https = require ('https');
// var MsTranslator = require('mstranslator');

console.log("Client works");

var lang1 = document.getElementById('lang1');
var lang2 = document.getElementById('lang2');
var dirIn = document.getElementById('dirIn');

console.log(lang2.options[lang2.selectedIndex].value);

socket.on('newLang', function(data) {
  console.log("Reveived Language");
  console.log(data);
  document.getElementById('lang1').insertAdjacentHTML( 'afterbegin', '<option>' + data + '</option>' );
  document.getElementById('lang2').insertAdjacentHTML( 'afterbegin', '<option>' + data + '</option>' );
});

 document.getElementById("directionIn").addEventListener("click", function() {
   console.log("Sending text");
   socket.emit('getTranlation', {
     dirIn: dirIn.value,
     Lang: lang2.options[lang2.selectedIndex].value
   });
 });

 socket.on('getTranlation', function(data) {
   console.log("Reveived Tranlation");
   console.log(data);
   document.getElementById('dirList').insertAdjacentHTML( 'afterbegin', '<li>' + data + '</li>' );
 });

$(document).ready(function () {
  $('.langContinue').click(function() {
    $("#enterDest").css('display', 'block');
    $('.langContinue').css('display', 'none');
  });

  $('.destContinue').click(function() {
    $("#giveDir").css('display', 'block');
    $('.destContinue').css('display', 'none');
  });

  // $('.addButton').click(function() {
  //   var val = $('#dirIn').val();
  //   $('ul.dirList').append('<li>' + val + '</li>');
  //   // e.preventDefault();
  // });
});
