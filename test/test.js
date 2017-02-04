/// <reference path="../typings/globals/mocha/index.d.ts" />
"use strict";
var chai_1 = require("chai");
var jsdom = require("mocha-jsdom");
var App = require("../sunrise");
describe('Sunrise', function () {
    jsdom();
    it('waterReflectionMiddle Opacity is the same thoughout the day', function (done) {
        var sr0 = new App.Sunrise(document);
        var sr1 = new App.Sunrise(document, 0.75);
        {
            var noon = { clientX: 137, clientY: 1 };
            sr0.changePictureByMouse(noon);
            sr1.changePictureByMouse(noon);
            var diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
            chai_1.expect(diff).to.be.below(Math.abs(sr0.waterReflectionMiddleOpacity() / 10), "at noon");
        }
        {
            var midnight = { clientX: 137, clientY: window.innerHeight };
            sr0.changePictureByMouse(midnight);
            sr1.changePictureByMouse(midnight);
            var diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
            chai_1.expect(diff).to.be.below(Math.abs(sr0.waterReflectionMiddleOpacity() / 10), "at midnight");
        }
        {
            var sunrise0 = { clientX: 137, clientY: window.innerHeight / 2 };
            sr0.changePictureByMouse(sunrise0);
            var sunrise1 = { clientX: 137, clientY: window.innerHeight * 0.75 };
            sr1.changePictureByMouse(sunrise1);
            var diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
            chai_1.expect(diff).to.be.below(Math.abs(sr0.waterReflectionMiddleOpacity() / 10), "at sunrise");
        }
        done();
    });
});
