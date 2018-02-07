// import { parse } from 'url';

const express = require('express')
// const app = express()

var socket = require('socket.io');

var app = express();
var server = app.listen(3000, function() {
  console.log("Listening on port 3000");
});

app.use(express.static('Code'))

var io = socket(server);


// app.listen(3000, () => console.log('Listening on port 3000'))

var https = require ('https');

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

var parseString = require('xml2js').parseString;
var convert = require('xml-js');

var MsTranslator = require('mstranslator');

let subscriptionKey = '7ecce5e6c7a8422d9b97e8043903c36b';

let host = 'api.microsofttranslator.com';
let transPath = '/V2/Http.svc/Translate';
let langPath = '/V2/Http.svc/GetLanguagesForTranslate?scope=text';
let langNamePath = '/V2/Http.svc/GetLanguageNames?locale=en';

let target = 'de-de';
let text = 'Hello';

let params = '?to=' + target + '&text=' + encodeURI(text);

var langArr = [];

var langNameArr = [];

var newTrans = 'help';


var client = new MsTranslator({
  api_key: "7ecce5e6c7a8422d9b97e8043903c36b"
}, true);


let lang_response_handler = function (response) {
  console.log("Getting language names");
  let body = '';
  response.on ('data', function (d) {
      console.log("data");
      console.log(d);
      body += d;
  });
  response.on ('end', function () {
      console.log("end");
      console.log(body);
      parseString(body, function(err, result) {
        console.log(result)
        // langNameArr = result;
      });
    });
  response.on ('error', function (e) {
      console.log ('Error: ' + e.message);
  });
};


let getLangNames = function() {
  console.log("Getting language names");
    let request_params = {
        method : 'POST',
        hostname : host,
        path : langNamePath,
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    let req = https.request (request_params, lang_response_handler);
    req.end ();
}


let arr_response_handler = function (response) {
  let body = '';
  response.on ('data', function (d) {
      body += d;
  });
  response.on ('end', function () {
      parseString(body, function(err, result) {
        console.log(result.ArrayOfstring.string)
        langArr = result.ArrayOfstring.string;
        // for(var i = 0; 3; i++) {
        //   console.log(langArr[i]);
        //   socket.emit('newLang', {
        //     lang: langArr[i]
        //   });
        // }
      });
    });
  response.on ('error', function (e) {
      console.log ('Error: ' + e.message);
  });
};


let getLangList = function() {
  console.log("Getting language list");
    let request_params = {
        method : 'GET',
        hostname : host,
        path : langPath,
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    let req = https.request (request_params, arr_response_handler);
    req.end ();
}

getLangList();


//
// getLangNames();
//
// Translate ();

io.on('connection', function(socket) {


  socket.on('getTranlation', function(data) {

    let response_handler = function (response) {
        let body = '';
        response.on ('data', function (d) {
            console.log(d);
            body += d;
        });
        response.on ('end', function () {
            console.log (body);
            // newTrans = body;
            parseString(body, function(err, result) {
              console.log(result.string._);
              responseTrans = result.string._;
              // socket.on('tranlated', function(responseTrans) {
              // });
              io.sockets.emit('getTranlation', result.string._);
            });
        });
        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });
    };

    let Translate = function (parameters) {
      console.log("Translating");
        let request_params = {
            method : 'GET',
            hostname : host,
            path : transPath + parameters,
            headers : {
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }
        };

        let req = https.request (request_params, response_handler);
        req.end ();
    }


    console.log("recieved message");

    console.log(data.dirIn);
    var responseTrans = '';
    newTarget = data.Lang;
    var parameters = '?to=' + newTarget + '&text=' + encodeURI(data.dirIn);
    Translate(parameters);

  })
});
