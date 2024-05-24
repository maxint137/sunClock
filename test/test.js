/// <reference path="../typings/globals/mocha/index.d.ts" />
define(["require", "exports", "chai", "mocha-jsdom", "../sunrise"], function (require, exports, chai_1, jsdom, App) {
    "use strict";
    describe('Sunrise', function () {
        jsdom();
        function runTest(sr0, sr1, methodUnderTetst) {
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
        }
        it('waterReflectionMiddleOpacity is consistent', function (done) {
            var sr0 = new App.Sunrise(document);
            var sr1 = new App.Sunrise(document, 0.75);
            runTest(sr0, sr1, App.Sunrise.prototype.waterReflectionMiddleOpacity);
            done();
        });
        it('horizonOpacity is consistent', function (done) {
            var sr0 = new App.Sunrise(document);
            var sr1 = new App.Sunrise(document, 0.75);
            runTest(sr0, sr1, App.Sunrise.prototype.horizonOpacity);
            done();
        });
        it('sunOpacity is consistent', function (done) {
            var sr0 = new App.Sunrise(document);
            var sr1 = new App.Sunrise(document, 0.75);
            runTest(sr0, sr1, App.Sunrise.prototype.sunOpacity);
            done();
        });
        it('moonOpacity is consistent', function (done) {
            var sr0 = new App.Sunrise(document);
            var sr1 = new App.Sunrise(document, 0.75);
            runTest(sr0, sr1, App.Sunrise.prototype.moonOpacity);
            done();
        });
        it('darknessOverlaySkyOpacity is consistent', function (done) {
            var sr0 = new App.Sunrise(document);
            var sr1 = new App.Sunrise(document, 0.75);
            runTest(sr0, sr1, App.Sunrise.prototype.darknessOverlaySkyOpacity);
            done();
        });
        it('darknessOverlayOpacity is consistent', function (done) {
            var sr0 = new App.Sunrise(document);
            var sr1 = new App.Sunrise(document, 0.75);
            runTest(sr0, sr1, App.Sunrise.prototype.darknessOverlayOpacity);
            done();
        });
    });
});
//# sourceMappingURL=test.js.map