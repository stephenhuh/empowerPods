'use strict';
const usbdetection = require('usb-detection');
const redis = require('redis'),
      client = redis.createClient();
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//Detect a USB Connection
usbdetection.on('add', function(device) {
  console.log(device);
  askForRegistrationCmd(null, device, function(response){
    console.log("at the callback");
  });
});


//Download the connected USBs and their serial numbers
//After asking for a registration prompt
function askForRegistrationCmd (err, device, cb) {
  rl.question(`Would you like to register this ${device.deviceName}?:\n` + "\nserialNumber: ", (answer, cb) => {
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

//

