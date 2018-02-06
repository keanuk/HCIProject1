'use strict';

var https = require ('https');
// var MsTranslator = require('mstranslator');


$(document).ready(function () {
  $('.langContinue').click(function() {
    $("#enterDest").css('display', 'block');
    $('.langContinue').css('display', 'none');
  });

  $('.destContinue').click(function() {
    $("#giveDir").css('display', 'block');
    $('.destContinue').css('display', 'none');
  });

  $('#dirForm').submit(function(e){
    var val = $(this).find('.dirIn').val();
    $('ul.dirList').append('<li>' + val + '</li>');
    e.preventDefault();
  });
});


