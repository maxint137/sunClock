import SunCalc from 'suncalc'

import { Sunrise } from "./sunrise.js";

var latlng = {
    lat: 35.7075239,
    lng: 139.729803
}

var fps = 1000;

// we refresh the object once a night
let sr = new Sunrise(document, 0.75);

function windowResize() {
    sr.updateDimensions();
}

const getUrlParameter = (sParam) => {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};



const hands = $('#liveclock div.hand')

if (getUrlParameter('noSeconds')) {
    fps = 1000 / 60;
}

window.requestAnimationFrame = window.requestAnimationFrame || function (f) {
    setTimeout(f, fps)
}


const updateClock = (firstCall: boolean) => {

    const curdate = new Date();

    const hour_as_degree = (curdate.getHours() + curdate.getMinutes() / 60) / 12 * 360
    const minute_as_degree = (curdate.getMinutes() + curdate.getSeconds() / 60) / 60 * 360
    const second_as_degree = (curdate.getSeconds() + curdate.getMilliseconds() / 1000) / 60 * 360

    hands.filter('.hour').css({
        transform: `rotate(${hour_as_degree}deg)`
    })
    hands.filter('.minute').css({
        transform: `rotate(${minute_as_degree}deg)`
    })
    hands.filter('.second').css({
        transform: `rotate(${second_as_degree}deg)`
    })

    if (firstCall || 0 == curdate.getSeconds() % 5) {
        const times = SunCalc.getTimes(new Date(), latlng.lat, latlng.lng);
        const lightsOn = times.sunrise < new Date() && new Date() < times.sunset;
        $("#lightswitch").prop("checked", !lightsOn);

        // update the barckground too:
        sr.setCurrentTime(curdate);
    }

    // refresh the sunrise data once a night
    if (0 == curdate.getHours() && 7 == curdate.getMinutes() && 5 == curdate.getSeconds()) {
        sr = new Sunrise(document, 0.75);
        console.log(sr.times);
    }
}

updateClock(true);


// calling raf from updateClock looks spooky - the call stack is endless, so:
setInterval(function () { requestAnimationFrame((_time: DOMHighResTimeStamp) => updateClock(false)) }, fps);

function initMap() {
    navigator.geolocation.getCurrentPosition(
        (location) => {
            latlng.lat = location.coords.latitude;
            latlng.lng = location.coords.longitude;
            console.log(latlng);

            // geodecode(latlng);
        }, (ah) => {
            console.log("getCurrentPosition failed, code=" + ah.code);
            alert("Can't get the current location. So we can't calculate the sun position");
            document.getElementById("location")?.setAttribute("data-after", ".");
        }
    );
}

// function geodecode(latlng) {
//     var geocoder = new google.maps.Geocoder;

//     var locationNames = [];
//     geocoder.geocode({
//         'location': latlng
//     }, function (results, status) {
//         if (status === 'OK') {
//             results.forEach(function (result) {
//                 // find sublocality or locality in types of address_components
//                 result.address_components.forEach(function (ac) {
//                     if (-1 < ac.types.indexOf('locality')) {
//                         locationNames.push(ac.short_name);
//                     }

//                 }, this);
//             }, this);

//         } else {
//             window.alert('Geocoder failed due to: ' + status);
//         }

//         console.log(locationNames);
//         $('.inner_face').attr('data-after',
//             locationNames[0]
//                 ? locationNames[0]
//                 : (Math.round(latlng.lat * 100) / 100) + "°, " + Math.round(latlng.lng * 100) / 100 + "°");
//     });
// }

