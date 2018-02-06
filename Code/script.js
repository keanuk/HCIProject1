'use strict';

var https = require ('https');
var MsTranslator = require('mstranslator');


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


let subscriptionKey = 'bd1bde314ac94a7abe3c2a49af9969d4';

let host = 'api.microsofttranslator.com';
let transPath = '/V2/Http.svc/Translate';
let langPath = '/V2/Http.svc/GetLanguageNames';

let target = 'fr-fr';
let text = 'Hello';

let params = '?to=' + target + '&text=' + encodeURI(text);


console.log("Test");

let response_handler = function (response) {
    console.log("response");
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        console.log (body);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};


let getLangList = function() {
    let request_params = {
        method : 'GET',
        hostname : host,
        path : langPath,
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'Content-Type':'application/xml',
        }
    };

    let req = https.request (request_params, response_handler);
    console.log("req");
    req.end ();

}

getLangList();

let Translate = function () {
    let request_params = {
        method : 'GET',
        hostname : host,
        path : transPath + params,
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'Content-Type':'application/xml',
        }
    };

    let req = https.request (request_params, response_handler);
    req.end ();
}

Translate ();
