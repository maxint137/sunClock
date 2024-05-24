/// <reference path="../typings/globals/mocha/index.d.ts" />

import { expect } from 'chai';
import * as jsdom from 'mocha-jsdom';

import * as App from "../sunrise";


describe('Sunrise', () => {

    jsdom();

    function runTest(sr0, sr1, methodUnderTetst) {
        {
            let noon = { clientX: 137, clientY: 1 } as MouseEvent;

            sr0.changePictureByMouse(noon);
            sr1.changePictureByMouse(noon);

            let diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
            expect(diff).to.be.below(Math.abs(sr0.waterReflectionMiddleOpacity() / 10), "at noon");
        }

        {
            let midnight = { clientX: 137, clientY: window.innerHeight } as MouseEvent;

            sr0.changePictureByMouse(midnight);
            sr1.changePictureByMouse(midnight);

            let diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
            expect(diff).to.be.below(Math.abs(sr0.waterReflectionMiddleOpacity() / 10), "at midnight");
        }

        {
            let sunrise0 = { clientX: 137, clientY: window.innerHeight / 2 } as MouseEvent;
            sr0.changePictureByMouse(sunrise0);

            let sunrise1 = { clientX: 137, clientY: window.innerHeight * 0.75 } as MouseEvent;
            sr1.changePictureByMouse(sunrise1);

            let diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
            expect(diff).to.be.below(Math.abs(sr0.waterReflectionMiddleOpacity() / 10), "at sunrise");
        }
    }

    it('waterReflectionMiddleOpacity is consistent', (done) => {

        let sr0 = new App.Sunrise(document);
        let sr1 = new App.Sunrise(document, 0.75);

        runTest(sr0, sr1, App.Sunrise.prototype.waterReflectionMiddleOpacity);

        done();
    });
    it('horizonOpacity is consistent', (done) => {

        let sr0 = new App.Sunrise(document);
        let sr1 = new App.Sunrise(document, 0.75);

        runTest(sr0, sr1, App.Sunrise.prototype.horizonOpacity);

        done();
    });
    it('sunOpacity is consistent', (done) => {

        let sr0 = new App.Sunrise(document);
        let sr1 = new App.Sunrise(document, 0.75);

        runTest(sr0, sr1, App.Sunrise.prototype.sunOpacity);

        done();
    });
    it('moonOpacity is consistent', (done) => {

        let sr0 = new App.Sunrise(document);
        let sr1 = new App.Sunrise(document, 0.75);

        runTest(sr0, sr1, App.Sunrise.prototype.moonOpacity);

        done();
    });
    it('darknessOverlaySkyOpacity is consistent', (done) => {

        let sr0 = new App.Sunrise(document);
        let sr1 = new App.Sunrise(document, 0.75);

        runTest(sr0, sr1, App.Sunrise.prototype.darknessOverlaySkyOpacity);

        done();
    });
    it('darknessOverlayOpacity is consistent', (done) => {

        let sr0 = new App.Sunrise(document);
        let sr1 = new App.Sunrise(document, 0.75);

        runTest(sr0, sr1, App.Sunrise.prototype.darknessOverlayOpacity);

        done();
    });
});