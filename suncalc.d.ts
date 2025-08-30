declare namespace SunCalc {
  interface SunTimes {
    solarNoon: string;
    nadir: string;
    sunrise: string;
    sunset: string;
    sunriseEnd: string;
    sunsetStart: string;
    dawn: string;
    dusk: string;
    nauticalDawn: string;
    nauticalDusk: string;
    nightEnd: string;
    night: string;
    goldenHourEnd: string;
    goldenHou: string;
  }

  export function getTimes(date: Date, lat: number, lng: number): SunTimes;
}
