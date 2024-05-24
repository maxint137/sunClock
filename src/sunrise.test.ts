// src/myModule.test.ts
import 'jsdom-global/register.js';

import { Sunrise } from './sunrise';

const runTest = (sr0, sr1, methodUnderTetst) => {
    {
        let noon = { clientX: 137, clientY: 1 } as MouseEvent;

        sr0.changePictureByMouse(noon);
        sr1.changePictureByMouse(noon);

        let diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
        // "at noon"
        expect(diff).toBeLessThan(Math.abs(sr0.waterReflectionMiddleOpacity() / 10));
    }

    {
        let midnight = { clientX: 137, clientY: window.innerHeight } as MouseEvent;

        sr0.changePictureByMouse(midnight);
        sr1.changePictureByMouse(midnight);

        let diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
        // "at midnight"
        expect(diff).toBeLessThan(Math.abs(sr0.waterReflectionMiddleOpacity() / 10));
    }

    {
        let sunrise0 = { clientX: 137, clientY: window.innerHeight / 2 } as MouseEvent;
        sr0.changePictureByMouse(sunrise0);

        let sunrise1 = { clientX: 137, clientY: window.innerHeight * 0.75 } as MouseEvent;
        sr1.changePictureByMouse(sunrise1);

        let diff = Math.abs(sr0.waterReflectionMiddleOpacity() - sr1.waterReflectionMiddleOpacity());
        // "at sunrise"
        expect(diff).toBeLessThan(Math.abs(sr0.waterReflectionMiddleOpacity() / 10));
    }
}

test('waterReflectionMiddleOpacity is consistent', () => {

    let sr0 = new Sunrise(document);
    let sr1 = new Sunrise(document, 0.75);

    runTest(sr0, sr1, Sunrise.prototype.waterReflectionMiddleOpacity);
});

test('horizonOpacity is consistent', () => {

    let sr0 = new Sunrise(document);
    let sr1 = new Sunrise(document, 0.75);

    runTest(sr0, sr1, Sunrise.prototype.horizonOpacity);
});

test('sunOpacity is consistent', () => {

    let sr0 = new Sunrise(document);
    let sr1 = new Sunrise(document, 0.75);

    runTest(sr0, sr1, Sunrise.prototype.sunOpacity);
});

test('moonOpacity is consistent', () => {

    let sr0 = new Sunrise(document);
    let sr1 = new Sunrise(document, 0.75);

    runTest(sr0, sr1, Sunrise.prototype.moonOpacity);
});

test('darknessOverlaySkyOpacity is consistent', () => {

    let sr0 = new Sunrise(document);
    let sr1 = new Sunrise(document, 0.75);

    runTest(sr0, sr1, Sunrise.prototype.darknessOverlaySkyOpacity);
});

test('darknessOverlayOpacity is consistent', () => {

    let sr0 = new Sunrise(document);
    let sr1 = new Sunrise(document, 0.75);

    runTest(sr0, sr1, Sunrise.prototype.darknessOverlayOpacity);
});


