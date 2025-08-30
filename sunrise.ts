/// <reference path="suncalc.d.ts" />
const CSS_PREFIXES = [
  "-webkit-radial-gradient",
  "-moz-radial-gradient",
  "-ms-radial-gradient",
];

export class Sunrise {
  mouse: any = { x: 0, y: 0 };

  myWidth: number;
  myHeight: number;

  times: SunCalc.SunTimes;

  curPos: number = 0;

  constructor(document: HTMLDocument, public skyProportion: number = 0.5) {
    const latlng = {
      lat: 35.7075239,
      lng: 139.729803,
    };

    // UF: need to update that once a day
    this.times = SunCalc.getTimes(new Date(), latlng.lat, latlng.lng);

    const that = this;

    document.addEventListener(
      "mousemove",
      function (e) {
        //that.changePictureByMouse(e);
      },
      false
    );

    // IE9, Chrome, Safari, Opera
    document.addEventListener(
      "mousewheel",
      (e: WheelEvent) => that.mouseWheelHandler(e),
      false
    );
    // Firefox
    //document.addEventListener("DOMMouseScroll", e=>that.mouseWheelHandler(e), false);

    this.updateDimensions();
  }

  setCurrentTime(curTime: Date) {
    this.curPos =
      ((curTime.getHours() * 60 + curTime.getMinutes()) * this.myWidth) /
      (24 * 60);

    //document.getElementById("curTime").innerText=curTime.toTimeString();

    this.moveSun(this.wheelPos2sunPos());
  }

  wheelPos2sunPos(): any {
    const noon = new Date(this.times.solarNoon);
    const nnPx =
      (this.myWidth * (noon.getHours() * 60 + noon.getMinutes())) / 24 / 60;

    if (this.curPos < nnPx) {
      //  before noon
      const sunrise = new Date(this.times.sunrise);
      const srPx =
        (this.myWidth / 24 / 60) *
        (sunrise.getHours() * 60 + sunrise.getMinutes());

      //y = -(x-srPx)/(nnPx-srPx)*hr + hr
      return {
        clientX: this.curPos,
        clientY:
          (-(this.curPos - srPx) / (nnPx - srPx)) *
            this.myHeight *
            this.skyProportion +
          this.myHeight * this.skyProportion,
      };
    } else {
      const sunset = new Date(this.times.sunset);
      const ssPx =
        (this.myWidth / 24 / 60) *
        (sunset.getHours() * 60 + sunset.getMinutes());

      //y = (x-ssPx)/(nnPx-ssPx)*hr + hr
      return {
        clientX: this.curPos,
        clientY:
          (-(this.curPos - ssPx) / (nnPx - ssPx)) *
            this.myHeight *
            this.skyProportion +
          this.myHeight * this.skyProportion,
      };
    }
  }

  mouseWheelHandler(e: WheelEvent) {
    const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));

    const wheelStep = 10;
    this.curPos = Math.max(
      0,
      Math.min(this.myWidth, this.curPos + delta * wheelStep)
    );

    this.moveSun(this.wheelPos2sunPos());
  }

  changePictureByMouse(e: MouseEvent) {
    this.moveSun(e);
  }

  updateDimensions() {
    if (typeof window.innerWidth == "number") {
      //Non-IE
      this.myWidth = window.innerWidth;
      this.myHeight = window.innerHeight;
    } else if (
      document.documentElement &&
      (document.documentElement.clientWidth ||
        document.documentElement.clientHeight)
    ) {
      this.myWidth = document.documentElement.clientWidth;
      this.myHeight = document.documentElement.clientHeight;
    } else if (
      document.body &&
      (document.body.clientWidth || document.body.clientHeight)
    ) {
      this.myWidth = document.body.clientWidth;
      this.myHeight = document.body.clientHeight;
    }
  }

  moveSun(e: any) {
    const build_path = (data: [string, number][]) =>
      "circle, " +
      data.map(([color, stop]) => `${color} ${stop}%`).join(",") +
      ")";

    this.mouse.x = e.clientX || e.pageX;
    this.mouse.y = e.clientY || e.pageY;
    this.updateDimensions();

    const sun = document.getElementById("sun");
    if (sun) {
      const sun_path_data: [string, number][] = [
        ["rgba(242,248,247,1)", 0], // light_blue
        ["rgba(249,249,28,1)", 3], // yellow
        ["rgba(247,214,46,1)", 8], // orange
        ["rgba(248,200,95,1)", 12], // light_orange
        ["rgba(201,165,132,1)", 30], // light_brown
        ["rgba(115,130,133,1)", 51], // grey
        ["rgba(46,97,122,1)", 85], // dark_grey
        ["rgba(24,75,106,1)", 100], // darker_grey
      ];

      CSS_PREFIXES.forEach((prefix) => {
        sun.style.background = `${prefix}(${this.mouse.x}px ${
          this.mouse.y
        }px, ${build_path(sun_path_data)}`;
      });
    }

    const sunDay = document.getElementById("sunDay");
    if (sunDay) {
      const sun_date_path_data: [string, number][] = [
        ["rgba(252,255,251,1)", 0], // light_blue
        ["rgba(253,250,219,0.4)", 30], // yellow
        ["rgba(226,219,197,0.01)", 70], //  very_light_brown
        ["rgba(226,219,197,0)", 70], // very_light_brown_transparent
        ["rgba(201,165,132,0)", 100], // light_brown_transparent
      ];

      CSS_PREFIXES.forEach((prefix) => {
        sunDay.style.background = `${prefix}(${this.mouse.x}px ${
          this.mouse.y
        }px, ${build_path(sun_date_path_data)}`;
      });
    }

    const sunSet = document.getElementById("sunSet");
    if (sunSet) {
      const sun_set_path_data: [string, number][] = [
        ["rgba(254,255,255,0.8)", 5], // white
        ["rgba(236,255,0,1)", 10], // yellow
        ["rgba(253,50,41,1)", 25], // red
        ["rgba(243,0,0,1)", 40], // dark_red
        ["rgba(93,0,0,1)", 100], // darker_red
      ];

      CSS_PREFIXES.forEach((prefix) => {
        sunSet.style.background = `${prefix}(${this.mouse.x}px ${
          this.mouse.y
        }px, ${build_path(sun_set_path_data)}`;
      });
    }

    const waterReflectionContainer = document.getElementById(
      "waterReflectionContainer"
    );
    if (waterReflectionContainer) {
      waterReflectionContainer.style.perspectiveOrigin =
        ((this.mouse.x / this.myWidth) * 100).toString() + "% -15%";
    }

    const waterReflectionMiddle = document.getElementById(
      "waterReflectionMiddle"
    );
    if (waterReflectionMiddle) {
      waterReflectionMiddle.style.left =
        (this.mouse.x - this.myWidth - this.myWidth * 0.03).toString() + "px";
    }

    const bodyWidth = document.getElementsByTagName("body")[0].clientWidth;

    if (sun) {
      sun.style.width = bodyWidth.toString();
      sun.style.left = "0px";
    }

    if (sunDay) {
      sunDay.style.width = bodyWidth.toString();
      sunDay.style.left = "0px";
    }

    const darknessOverlay = document.getElementById("darknessOverlay");
    darknessOverlay
      ? (darknessOverlay.style.opacity = "" + this.darknessOverlayOpacity())
      : null;

    const darknessOverlaySky = document.getElementById("darknessOverlaySky");
    darknessOverlaySky
      ? (darknessOverlaySky.style.opacity =
          "" + this.darknessOverlaySkyOpacity())
      : null;

    const moon = document.getElementById("moon");
    !moon ? null : (moon.style.opacity = "" + this.moonOpacity());

    const horizonNight = document.getElementById("horizonNight");
    !horizonNight
      ? null
      : (horizonNight.style.opacity =
          "" +
          (this.mouse.y - (this.myHeight * this.skyProportion * 2 * 4) / 5) /
            (this.myHeight * (1 - this.skyProportion) * 2 -
              (this.myHeight * (1 - this.skyProportion) * 2 * 4) / 5));

    const starsContainer = document.getElementById("starsContainer");
    !starsContainer
      ? null
      : (starsContainer.style.opacity =
          "" + (this.mouse.y / (this.myHeight * this.skyProportion * 2) - 0.6));

    const waterDistance = document.getElementById("waterDistance");
    !waterDistance
      ? null
      : (waterDistance.style.opacity =
          "" +
          (this.mouse.y / (this.myHeight * (1 - this.skyProportion) * 2) +
            0.6));

    sunDay
      ? (sunDay.style.opacity =
          "" + (1 - this.mouse.y / (this.myHeight * this.skyProportion * 2)))
      : null;

    const sky = document.getElementById("sky");
    !sky
      ? null
      : (sky.style.opacity =
          "" +
          Math.min(
            1 - this.mouse.y / (this.myHeight * this.skyProportion * 2),
            0.99
          ));

    !sunSet
      ? null
      : (sunSet.style.opacity =
          "" + (this.mouse.y / (this.myHeight * this.skyProportion * 2) - 0.2));

    const horizon = document.getElementById("horizon");

    !sun ? null : (sun.style.opacity = "" + this.sunOpacity());
    !horizon ? null : (horizon.style.opacity = "" + this.horizonOpacity());
    !waterReflectionMiddle
      ? null
      : (waterReflectionMiddle.style.opacity =
          "" + this.waterReflectionMiddleOpacity());
  }

  darknessOverlayOpacity() {
    return Math.min(
      (this.mouse.y - this.myHeight * this.skyProportion) /
        (this.myHeight * this.skyProportion),
      1
    );
  }

  darknessOverlaySkyOpacity() {
    return Math.min(
      (this.mouse.y - (this.myHeight * 7) / 10) /
        (this.myHeight - (this.myHeight * 7) / 10),
      1
    );
  }

  moonOpacity() {
    const nightSkyDarkness = 0.65;
    return Math.min(
      (this.mouse.y - (this.myHeight * 9) / 10) /
        (this.myHeight - (this.myHeight * 9) / 10),
      nightSkyDarkness
    );
  }

  sunOpacity() {
    if (this.sunBelowHorizon()) {
      return Math.min(
        (this.myHeight - this.mouse.y) /
          (this.myHeight * (1 - this.skyProportion)) +
          0.2,
        0.5
      );
    } else {
      return Math.min(this.mouse.y / (this.myHeight * this.skyProportion), 0.5);
    }
  }

  horizonOpacity() {
    if (this.sunBelowHorizon()) {
      return (
        (this.myHeight - this.mouse.y) /
          (this.myHeight * (1 - this.skyProportion)) +
        0.2
      );
    } else {
      return Math.min(
        this.mouse.y / (this.myHeight * this.skyProportion),
        0.99
      );
    }
  }

  waterReflectionMiddleOpacity() {
    const that = this;
    if (that.sunBelowHorizon()) {
      return (
        (that.myHeight - that.mouse.y) /
          (that.myHeight * (1 - that.skyProportion)) -
        0.1
      );
    } else {
      return that.mouse.y / (that.myHeight * that.skyProportion) - 0.1;
    }
  }

  sunBelowHorizon() {
    return this.mouse.y > this.myHeight * this.skyProportion;
  }
}
