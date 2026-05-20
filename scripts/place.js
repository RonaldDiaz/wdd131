const temperatureField = document.querySelector("#temperature");
const conditionsField = document.querySelector("#conditions");
const windField = document.querySelector("#wind");
const windChillField = document.querySelector("#windChill");

const temperature = 7;
const conditions = "Clear";
const windSpeed = 10;

let windChillDisplay = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
    const chill = calculateWindChill(temperature, windSpeed);
    windChillDisplay = `${chill.toFixed(1)}°C`;
}

temperatureField.textContent = `${temperature}°C`;
conditionsField.textContent = conditions;
windField.textContent = `${windSpeed} Km/h`;
windChillField.textContent = windChillDisplay;

function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}