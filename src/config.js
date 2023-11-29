const APIKEY = '4d938dec5b23489c878182327232911';


class CurrentWeather {
    
    constructor(city) {
        this.city = city;
    }

    getWeather() {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${this.city}&aqi=no`, {mode: 'cors'})
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          const newReport = new CurrentWeatherDOMCelsius(response.current.temp_c,response.current.feelslike_c, response.current.condition.text, response.current.condition.icon, response.current.wind_kph, response.location.name)
        });
    };

}

class CurrentWeatherDOMCelsius {
    constructor(tempC, feelsC, conditionText, iconSrc, windKPH, city) {
        this.tempC = tempC;
        this.feelsC = feelsC;
        this.conditionText = conditionText;
        this.iconSrc = iconSrc;
        this.windKPH = windKPH;
        this.city = city
        this.buildDom();
    };

    buildDom() {
        this.buildTitle();
        this.buildTemperature();
        this.buildCondition()
        this.buildWind();        
    };

    buildTitle() {
        const titleText = document.querySelector('#title');
        titleText.textContent = this.city;
    };

    buildTemperature() {
        const weatherTemp = document.querySelector('#temperature');
        weatherTemp.innerHTML = '';
        const tempActual = document.createElement('p');
        const tempFeels = document.createElement('p');
        tempActual.textContent = `Current: ${this.tempC} Celsius`;
        tempFeels.textContent = `Feels Like: ${this.feelsC} Celsius`;
        weatherTemp.appendChild(tempActual);
        weatherTemp.appendChild(tempFeels);
    };

    buildCondition() {
        const weatherCondition = document.querySelector('#conditions');
        weatherCondition.innerHTML = '';
        const weatherConditionDescription = document.createElement('p');
        const weatherConditionIcon = document.createElement('img');

        weatherConditionIcon.src = `https:${this.iconSrc}`;
        weatherConditionDescription.textContent = this.conditionText;
        weatherCondition.appendChild(weatherConditionDescription);
        weatherCondition.appendChild(weatherConditionIcon);

    };

    buildWind() {
        const weatherWind = document.querySelector('#wind');
        weatherWind.innerHTML = '';
        weatherWind.textContent = `Wind: ${this.windKPH} KM/H`;
    }
};

class SearchButton {
    constructor(selectedCity) {
        this.city = selectedCity;
        this.inputField = document.querySelector('#selected_city');
        this.button = document.querySelector('#searchButton');
        this.button.addEventListener('click', (event) =>{
            event.preventDefault();
            reportWeather(this.inputField.value);
        })
    }




}

function reportWeather(selectedCity) {
    const weatherReport = new CurrentWeather(selectedCity);
    const thisButton = new SearchButton(selectedCity);
    weatherReport.getWeather();
}

reportWeather('Athens');
    

