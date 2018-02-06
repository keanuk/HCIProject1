// import { parse } from 'url';

const express = require('express')
const app = express()

app.use(express.static('Code'))

app.listen(3000, () => console.log('Listening on port 3000'))

var https = require ('https');

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

var parseString = require('xml2js').parseString;
var convert = require('xml-js');

let subscriptionKey = '7ecce5e6c7a8422d9b97e8043903c36b';

let host = 'api.microsofttranslator.com';
let transPath = '/V2/Http.svc/Translate';
let langPath = '/V2/Http.svc/GetLanguagesForTranslate?scope=text';
let langNamePath = '/V2/Http.svc/GetLanguageNames?locale=en';

let target = 'de-de';
let text = 'Hello';

let params = '?to=' + target + '&text=' + encodeURI(text);

var langArr = [];

let response_handler = function (response) {
    console.log("response");
    let body = '';
    response.on ('data', function (d) {
        console.log("data");
        console.log(d);
        body += d;
    });
    response.on ('end', function () {
        console.log("end");
        console.log (body);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let arr_response_handler = function (response) {
  console.log("arr response");
  let body = '';
  response.on ('data', function (d) {
      console.log("data");
      console.log(d);
      body += d;
  });
  response.on ('end', function () {
      console.log("end");
      // console.log (JSON.stringify(body));
      parseString(body, function(err, result) {
        console.log(result.ArrayOfstring);
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

    let req = https.request (request_params, arr_response_handler);
    req.end ();
}


let Translate = function () {
  console.log("Translating");
    let request_params = {
        method : 'GET',
        hostname : host,
        path : transPath + params,
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    let req = https.request (request_params, response_handler);
    req.end ();
}


getLangList();

getLangNames();

Translate ();
