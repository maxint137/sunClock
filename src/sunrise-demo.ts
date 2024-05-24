import { Sunrise } from './sunrise.js'

document.addEventListener("DOMContentLoaded", () => {

    const sunriseInstance = new Sunrise(document, 0.75);

    window.addEventListener('resize', sunriseInstance.updateDimensions);
});
