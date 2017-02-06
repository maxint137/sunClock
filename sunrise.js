/// <reference path="suncalc.d.ts" />
"use strict";
var Sunrise = (function () {
    function Sunrise(document, skyProportion) {
        if (skyProportion === void 0) { skyProportion = 0.5; }
        this.skyProportion = skyProportion;
        this.mouse = { x: 0, y: 0 };
        this.curPos = 0;
        var latlng = {
            lat: 35.7075239,
            lng: 139.729803
        };
        // UF: need to update that once a day
        this.times = SunCalc.getTimes(new Date(), latlng.lat, latlng.lng);
        var that = this;
        document.addEventListener('mousemove', function (e) {
            //that.changePictureByMouse(e);
        }, false);
        // IE9, Chrome, Safari, Opera
        document.addEventListener("mousewheel", function (e) { return that.mouseWheelHandler(e); }, false);
        // Firefox
        //document.addEventListener("DOMMouseScroll", e=>that.mouseWheelHandler(e), false);
        this.updateDimensions();
    }
    Sunrise.prototype.setCurrentTime = function (curTime) {
        this.curPos = (curTime.getHours() * 60 + curTime.getMinutes()) * this.myWidth / 24 * 60;
        document.getElementById("curTime").innerText = curTime.toTimeString();
        this.moveSun(this.wheelPos2sunPos());
    };
    Sunrise.prototype.wheelPos2sunPos = function () {
        var noon = new Date(this.times.solarNoon);
        var nnPx = this.myWidth * (noon.getHours() * 60 + noon.getMinutes()) / 24 / 60;
        if (this.curPos < nnPx) {
            //  before noon
            var sunrise = new Date(this.times.sunrise);
            var srPx = this.myWidth / 24 / 60 * (sunrise.getHours() * 60 + sunrise.getMinutes());
            //y = -(x-srPx)/(nnPx-srPx)*hr + hr
            return { clientX: this.curPos, clientY: -(this.curPos - srPx) / (nnPx - srPx) * this.myHeight * this.skyProportion + this.myHeight * this.skyProportion };
        }
        else {
            var sunset = new Date(this.times.sunset);
            var ssPx = this.myWidth / 24 / 60 * (sunset.getHours() * 60 + sunset.getMinutes());
            //y = (x-ssPx)/(nnPx-ssPx)*hr + hr
            return { clientX: this.curPos, clientY: -(this.curPos - ssPx) / (nnPx - ssPx) * this.myHeight * this.skyProportion + this.myHeight * this.skyProportion };
        }
    };
    Sunrise.prototype.mouseWheelHandler = function (e) {
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        var wheelStep = 10;
        this.curPos = Math.max(0, Math.min(this.myWidth, this.curPos + delta * wheelStep));
        var curTime = new Date(new Date(2017, 0, 24).getTime() + this.curPos / this.myWidth * 24 * 60 * 60000);
        document.getElementById("curTime").innerText = curTime.toTimeString();
        this.moveSun(this.wheelPos2sunPos());
    };
    Sunrise.prototype.changePictureByMouse = function (e) {
        this.moveSun(e);
    };
    Sunrise.prototype.updateDimensions = function () {
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            this.myWidth = window.innerWidth;
            this.myHeight = window.innerHeight;
        }
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            this.myWidth = document.documentElement.clientWidth;
            this.myHeight = document.documentElement.clientHeight;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            this.myWidth = document.body.clientWidth;
            this.myHeight = document.body.clientHeight;
        }
    };
    Sunrise.prototype.moveSun = function (e) {
        this.mouse.x = e.clientX || e.pageX;
        this.mouse.y = e.clientY || e.pageY;
        this.updateDimensions();
        var sun = document.getElementById("sun");
        if (sun) {
            var sunPath = 'circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)';
            sun.style.background = '-webkit-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunPath;
            sun.style.background = '-moz-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunPath;
            sun.style.background = '-ms-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunPath;
        }
        var sunDay = document.getElementById("sunDay");
        if (sunDay) {
            var sunDayPath = 'circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%)';
            sunDay.style.background = '-webkit-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunDayPath;
            sunDay.style.background = '-moz-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunDayPath;
            sunDay.style.background = '-ms-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunDayPath;
        }
        var sunSet = document.getElementById("sunSet");
        if (sunSet) {
            var sunSetPath = 'circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)';
            sunSet.style.background = '-webkit-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunSetPath;
            sunSet.style.background = '-moz-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunSetPath;
            sunSet.style.background = '-ms-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunSetPath;
        }
        var waterReflectionContainer = document.getElementById("waterReflectionContainer");
        if (waterReflectionContainer) {
            waterReflectionContainer.style.perspectiveOrigin = (this.mouse.x / this.myWidth * 100).toString() + "% -15%";
        }
        var waterReflectionMiddle = document.getElementById("waterReflectionMiddle");
        if (waterReflectionMiddle) {
            waterReflectionMiddle.style.left = (this.mouse.x - this.myWidth - (this.myWidth * .03)).toString() + "px";
        }
        var bodyWidth = document.getElementsByTagName("body")[0].clientWidth;
        if (sun) {
            sun.style.width = bodyWidth.toString();
            sun.style.left = "0px";
        }
        if (sunDay) {
            sunDay.style.width = bodyWidth.toString();
            sunDay.style.left = "0px";
        }
        var darknessOverlay = document.getElementById("darknessOverlay");
        darknessOverlay ? darknessOverlay.style.opacity = '' + this.darknessOverlayOpacity() : null;
        var darknessOverlaySky = document.getElementById("darknessOverlaySky");
        darknessOverlaySky ? darknessOverlaySky.style.opacity = '' + this.darknessOverlaySkyOpacity() : null;
        var moon = document.getElementById("moon");
        !moon ? null : moon.style.opacity = '' + this.moonOpacity();
        var horizonNight = document.getElementById("horizonNight");
        !horizonNight ? null : horizonNight.style.opacity = '' + (this.mouse.y - ((this.myHeight * this.skyProportion * 2) * 4 / 5))
            / ((this.myHeight * (1 - this.skyProportion) * 2) - ((this.myHeight * (1 - this.skyProportion) * 2) * 4 / 5));
        var starsContainer = document.getElementById("starsContainer");
        !starsContainer ? null : starsContainer.style.opacity = '' + (this.mouse.y / (this.myHeight * this.skyProportion * 2) - 0.6);
        var waterDistance = document.getElementById("waterDistance");
        !waterDistance ? null : waterDistance.style.opacity = '' + (this.mouse.y / (this.myHeight * (1 - this.skyProportion) * 2) + 0.6);
        sunDay ? sunDay.style.opacity = '' + (1 - this.mouse.y / (this.myHeight * this.skyProportion * 2)) : null;
        var sky = document.getElementById("sky");
        !sky ? null : sky.style.opacity = '' + Math.min((1 - this.mouse.y / (this.myHeight * this.skyProportion * 2)), 0.99);
        !sunSet ? null : sunSet.style.opacity = '' + (this.mouse.y / (this.myHeight * this.skyProportion * 2) - 0.2);
        var horizon = document.getElementById("horizon");
        !sun ? null : sun.style.opacity = '' + this.sunOpacity();
        !horizon ? null : horizon.style.opacity = '' + this.horizonOpacity();
        !waterReflectionMiddle ? null : waterReflectionMiddle.style.opacity = '' + this.waterReflectionMiddleOpacity();
    };
    Sunrise.prototype.darknessOverlayOpacity = function () {
        return Math.min((this.mouse.y - (this.myHeight * this.skyProportion)) / (this.myHeight * this.skyProportion), 1);
    };
    Sunrise.prototype.darknessOverlaySkyOpacity = function () {
        return Math.min((this.mouse.y - (this.myHeight * 7 / 10)) / (this.myHeight - (this.myHeight * 7 / 10)), 1);
    };
    Sunrise.prototype.moonOpacity = function () {
        var nightSkyDarkness = 0.65;
        return Math.min((this.mouse.y - (this.myHeight * 9 / 10)) / (this.myHeight - (this.myHeight * 9 / 10)), nightSkyDarkness);
    };
    Sunrise.prototype.sunOpacity = function () {
        if (this.sunBelowHorizon()) {
            return Math.min((this.myHeight - this.mouse.y) / (this.myHeight * (1 - this.skyProportion)) + 0.2, 0.5);
        }
        else {
            return Math.min(this.mouse.y / (this.myHeight * this.skyProportion), 0.5);
        }
    };
    Sunrise.prototype.horizonOpacity = function () {
        if (this.sunBelowHorizon()) {
            return (this.myHeight - this.mouse.y) / (this.myHeight * (1 - this.skyProportion)) + 0.2;
        }
        else {
            return Math.min(this.mouse.y / (this.myHeight * this.skyProportion), 0.99);
        }
    };
    Sunrise.prototype.waterReflectionMiddleOpacity = function () {
        var that = this;
        if (that.sunBelowHorizon()) {
            return (that.myHeight - that.mouse.y) / (that.myHeight * (1 - that.skyProportion)) - 0.1;
        }
        else {
            return that.mouse.y / (that.myHeight * that.skyProportion) - 0.1;
        }
    };
    Sunrise.prototype.sunBelowHorizon = function () {
        return this.mouse.y > this.myHeight * this.skyProportion;
    };
    return Sunrise;
}());
exports.Sunrise = Sunrise;
//# sourceMappingURL=sunrise.js.map