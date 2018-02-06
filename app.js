// var cors = require('cors')

const express = require('express')
const app = express()

app.use(express.static('Code'))
// app.use(cors())

app.listen(3000, () => console.log('Listening on port 3000'))

var https = require ('https');

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

let subscriptionKey = '7ecce5e6c7a8422d9b97e8043903c36b';

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
        }
    };

    let req = https.request (request_params, response_handler);
    req.end ();
}

Translate ();
