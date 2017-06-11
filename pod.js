'use strict';
const usbdetection = require('usb-detection');
const redis = require('redis'),
      client = redis.createClient();
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const opn = require('opn');
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

//Set path to directory of views
app.set('views', 'public');

//Use ejs for vanilla html compatibility
app.set('view engine', 'ejs');

//Parses the text as URL encoded data and exposes the resulting 
//object (containing the keys and values) on req.body
//{extended: true} property uses qs library to parse instead of querystring library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); //TODO Check if this is needed yet
app.use(express.static('./public'));

let devicesInMemory = [];

//Detect a USB Connection
usbdetection.on('add', function(device) {
  //SAVE an array of device ids
  console.log(device);
  opn("http://localhost:3000"); //TODO: hacky urls
  devicesInMemory.push(device);
  askForRegistrationCmd(null, device, function(response){
    console.log("at the callback");
  });
});


//Download the connected USBs and their serial numbers
//After asking for a registration prompt
function askForRegistrationCmd (err, device, cb) {
  rl.question(`Would you like to register this ${device.deviceName}?:\n`, (answer, cb) => {
    if (answer === "yes" || "Yes" || "Y") { //TODO fix this bullshit logic
      console.log(`Registering your ${device.deviceName}`);
      cb(null, answer);
    } else if ( answer === "no" || "No" || "N") {
      console.log(`Not registering your ${answer}`);
    }
    rl.close();
  });
}


//Get a NIC id
function syncFiles (err, deviceToSync, cb) {


}


//Store and associate

//Render registration for class

//Pod has multiple units -- can do different subjects

//View API Logic lmao
//The way this works is opn sends get requests here and thus can alter routing logic
/* Routes */
app.get('/', (req,res) => {
  res.render('index');
});

app.get('/index', (req,res) => {
});


app.post('/devices', (req, res) => {
  res.jsonp(devicesInMemory);
});

console.log("should be listening on port..", port);
app.listen(port);
