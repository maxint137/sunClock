/// <reference path="suncalc.d.ts" />


export class Sunrise {

    mouse: any = { x: 0, y: 0 };
    myWidth: number;
    myHeight: number;

    times: SunCalc.SunTimes;

    curPos: number = 0;

    constructor(document: HTMLDocument, public skyProportion: number = 0.5) {

        let latlng = {
            lat: 35.7075239,
            lng: 139.729803
        }

        // UF: need to update that once a day
        this.times = SunCalc.getTimes(new Date(), latlng.lat, latlng.lng);
        
        let that = this;

        document.addEventListener('mousemove', function (e) {
            //that.changePictureByMouse(e);
            console.log(e.clientX + " " + e.clientY);
        }, false);

        // IE9, Chrome, Safari, Opera
        document.addEventListener("mousewheel", e => that.mouseWheelHandler(e), false);
        // Firefox
        //document.addEventListener("DOMMouseScroll", e=>that.mouseWheelHandler(e), false);

        this.updateDimensions();
    }

    wheelPos2sunPos(): any {

        let noon = new Date(this.times.solarNoon);
        let nnPx = this.myWidth * (noon.getHours() * 60 + noon.getMinutes()) / 24 / 60;

        if (this.curPos < nnPx) {
            //  before noon
            let sunrise = new Date(this.times.sunrise);
            let srPx = this.myWidth / 24 / 60 * (sunrise.getHours() * 60 + sunrise.getMinutes());

            //y = -(x-srPx)/(nnPx-srPx)*hr + hr
            return { clientX: this.curPos, clientY: -(this.curPos - srPx) / (nnPx - srPx) * this.myHeight * this.skyProportion + this.myHeight * this.skyProportion};
        }
        else {
            let sunset = new Date(this.times.sunset);
            let ssPx = this.myWidth / 24 / 60 * (sunset.getHours() * 60 + sunset.getMinutes());

            //y = (x-ssPx)/(nnPx-ssPx)*hr + hr
            return { clientX: this.curPos, clientY: -(this.curPos - ssPx) / (nnPx - ssPx) * this.myHeight * this.skyProportion + this.myHeight * this.skyProportion};
        }
    }

    mouseWheelHandler(e: MouseWheelEvent) {

        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        let wheelStep = 10;
        this.curPos = Math.max(0, Math.min(this.myWidth, this.curPos + delta * wheelStep));

        let curTime = new Date(new Date(2017, 0, 24).getTime() + this.curPos/this.myWidth*24*60*60000);
        document.getElementById("curTime").innerText=curTime.toTimeString();

        this.moveSun(this.wheelPos2sunPos());        
    }

    changePictureByMouse(e: MouseEvent) {
        this.moveSun(e);
    }

    updateDimensions() {
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            this.myWidth = window.innerWidth;
            this.myHeight = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {

            this.myWidth = document.documentElement.clientWidth;
            this.myHeight = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {

            this.myWidth = document.body.clientWidth;
            this.myHeight = document.body.clientHeight;
        }
    }


    moveSun(e: any) {

        this.mouse.x = e.clientX || e.pageX;
        this.mouse.y = e.clientY || e.pageY
        this.updateDimensions();

        let sun = document.getElementById("sun");
        if (sun) {
            let sunPath = 'circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)';
            sun.style.background = '-webkit-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunPath;
            sun.style.background = '-moz-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunPath;
            sun.style.background = '-ms-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunPath;
        }

        let sunDay = document.getElementById("sunDay");
        if (sunDay) {
            let sunDayPath = 'circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%)';
            sunDay.style.background = '-webkit-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunDayPath;
            sunDay.style.background = '-moz-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunDayPath;
            sunDay.style.background = '-ms-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunDayPath;
        }

        let sunSet = document.getElementById("sunSet");
        if (sunSet) {
            let sunSetPath = 'circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)';
            sunSet.style.background = '-webkit-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunSetPath;
            sunSet.style.background = '-moz-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunSetPath;
            sunSet.style.background = '-ms-radial-gradient(' + this.mouse.x + 'px ' + this.mouse.y + 'px, ' + sunSetPath;
        }


        let waterReflectionContainer = document.getElementById("waterReflectionContainer");
        if (waterReflectionContainer) {
            waterReflectionContainer.style.perspectiveOrigin = (this.mouse.x / this.myWidth * 100).toString() + "% -15%";
        }

        let waterReflectionMiddle = document.getElementById("waterReflectionMiddle");
        if (waterReflectionMiddle) {
            waterReflectionMiddle.style.left = (this.mouse.x - this.myWidth - (this.myWidth * .03)).toString() + "px";
        }


        let bodyWidth = document.getElementsByTagName("body")[0].clientWidth;

        if (sun) {
            sun.style.width = bodyWidth.toString();
            sun.style.left = "0px";
        }

        if (sunDay) {
            sunDay.style.width = bodyWidth.toString();
            sunDay.style.left = "0px";
        }


        let darknessOverlay = document.getElementById("darknessOverlay");
        darknessOverlay ? darknessOverlay.style.opacity = '' + this.darknessOverlayOpacity() : null;

        let darknessOverlaySky = document.getElementById("darknessOverlaySky");
        darknessOverlaySky ? darknessOverlaySky.style.opacity = '' + this.darknessOverlaySkyOpacity() : null;

        let moon = document.getElementById("moon");
        !moon ? null : moon.style.opacity = '' + this.moonOpacity();

        let horizonNight = document.getElementById("horizonNight");
        !horizonNight ? null : horizonNight.style.opacity = '' + (this.mouse.y - ((this.myHeight * this.skyProportion * 2) * 4 / 5))
            / ((this.myHeight * (1 - this.skyProportion) * 2) - ((this.myHeight * (1 - this.skyProportion) * 2) * 4 / 5));

        let starsContainer = document.getElementById("starsContainer");
        !starsContainer ? null : starsContainer.style.opacity = '' + (this.mouse.y / (this.myHeight * this.skyProportion * 2) - 0.6);

        let waterDistance = document.getElementById("waterDistance");
        !waterDistance ? null : waterDistance.style.opacity = '' + (this.mouse.y / (this.myHeight * (1 - this.skyProportion) * 2) + 0.6);

        sunDay ? sunDay.style.opacity = '' + (1 - this.mouse.y / (this.myHeight * this.skyProportion * 2)) : null;

        let sky = document.getElementById("sky");
        !sky ? null : sky.style.opacity = '' + Math.min((1 - this.mouse.y / (this.myHeight * this.skyProportion * 2)), 0.99);

        !sunSet ? null : sunSet.style.opacity = '' + (this.mouse.y / (this.myHeight * this.skyProportion * 2) - 0.2);

        let horizon = document.getElementById("horizon");

        !sun ? null : sun.style.opacity = '' + this.sunOpacity();
        !horizon ? null : horizon.style.opacity = '' + this.horizonOpacity()
        !waterReflectionMiddle ? null : waterReflectionMiddle.style.opacity = '' + this.waterReflectionMiddleOpacity();
    }

    darknessOverlayOpacity() {
        return Math.min((this.mouse.y - (this.myHeight * this.skyProportion)) / (this.myHeight * this.skyProportion), 1);
    }

    darknessOverlaySkyOpacity() {
        return Math.min((this.mouse.y - (this.myHeight * 7 / 10)) / (this.myHeight - (this.myHeight * 7 / 10)), 1);
    }

    moonOpacity() {
        let nightSkyDarkness = 0.65;
        return Math.min((this.mouse.y - (this.myHeight * 9 / 10)) / (this.myHeight - (this.myHeight * 9 / 10)), nightSkyDarkness);
    }

    sunOpacity() {
        if (this.sunBelowHorizon()) {
            return Math.min((this.myHeight - this.mouse.y) / (this.myHeight * (1 - this.skyProportion)) + 0.2, 0.5);
        }
        else {
            return Math.min(this.mouse.y / (this.myHeight * this.skyProportion), 0.5);
        }
    }

    horizonOpacity() {
        if (this.sunBelowHorizon()) {
            return (this.myHeight - this.mouse.y) / (this.myHeight * (1 - this.skyProportion)) + 0.2;
        }
        else {
            return Math.min(this.mouse.y / (this.myHeight * this.skyProportion), 0.99);
        }
    }

    waterReflectionMiddleOpacity() {
        let that = this;
        if (that.sunBelowHorizon()) {
            return (that.myHeight - that.mouse.y) / (that.myHeight * (1 - that.skyProportion)) - 0.1;
        } else {
            return that.mouse.y / (that.myHeight * that.skyProportion) - 0.1;
        }
    }

    sunBelowHorizon() {
        return this.mouse.y > this.myHeight * this.skyProportion;
    }
}
