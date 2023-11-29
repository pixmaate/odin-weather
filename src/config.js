const APIKEY = "4d938dec5b23489c878182327232911";

class CurrentWeather {
  constructor(city) {
    this.city = city;
  }

  getWeather(celsiusFarenheit) {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${this.city}&aqi=no`,
      { mode: "cors" },
    )
      .then((response) => response.json())
      .then((response) => {
        if (celsiusFarenheit === "C") {
          const newReport = new CurrentWeatherDOM(
            response.current.temp_c,
            response.current.feelslike_c,
            response.current.condition.text,
            response.current.condition.icon,
            response.current.wind_kph,
            response.location.name,
            "C",
          );
          this.getNextDay("C");
        } else if (celsiusFarenheit === "F") {
          const newReport = new CurrentWeatherDOM(
            response.current.temp_f,
            response.current.feelslike_f,
            response.current.condition.text,
            response.current.condition.icon,
            response.current.wind_mph,
            response.location.name,
            "F",
          );
          this.getNextDay("F");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getNextDay(celsiusFarenheit) {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${this.city}&days=2&aqi=no`,
      { mode: "cors" },
    )
      .then((response) => response.json())
      .then((response) => {
        if (celsiusFarenheit === "C") {
          const newTomo = new NextDayDOM(
            response.forecast.forecastday[1].day.maxtemp_c,
            response.forecast.forecastday[1].day.condition.text,
            response.forecast.forecastday[1].day.condition.icon,
            response.forecast.forecastday[1].day.maxwind_kph,
            "C",
          );
        } else if (celsiusFarenheit === "F") {
          const newTomo = new NextDayDOM(
            response.forecast.forecastday[1].day.maxtemp_f,
            response.forecast.forecastday[1].day.condition.text,
            response.forecast.forecastday[1].day.condition.icon,
            response.forecast.forecastday[1].day.maxwind_mph,
            "F",
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

class CurrentWeatherDOM {
  constructor(tempC, feelsC, conditionText, iconSrc, windKPH, city, CorF) {
    this.tempC = tempC;
    this.feelsC = feelsC;
    this.conditionText = conditionText;
    this.iconSrc = iconSrc;
    this.windKPH = windKPH;
    this.city = city;
    this.CorF = CorF;
    this.buildDom();
  }

  buildDom() {
    this.buildTitle();
    this.buildTemperature();
    this.buildCondition();
    this.buildWind();
  }

  buildTitle() {
    const titleText = document.querySelector("#title");
    titleText.textContent = this.city;
  }

  buildTemperature() {
    const weatherTemp = document.querySelector("#temperature");
    weatherTemp.innerHTML = "";
    const tempActual = document.createElement("p");
    const tempFeels = document.createElement("p");
    if (this.CorF === "C") {
      tempActual.textContent = `${this.tempC} C`;
      tempFeels.textContent = `Feels Like: ${this.feelsC} C`;
    } else if (this.CorF === "F") {
      tempActual.textContent = `${this.tempC} F`;
      tempFeels.textContent = `Feels Like: ${this.feelsC} F`;
    }
    tempActual.style.cssText = "font-size:1.3rem;font-weight:600;";

    weatherTemp.textContent = "Now";
    weatherTemp.style.cssText = "font-size:1.1rem;";
    weatherTemp.appendChild(tempActual);
    weatherTemp.appendChild(tempFeels);
  }

  buildCondition() {
    const weatherCondition = document.querySelector("#conditions");
    weatherCondition.innerHTML = "";
    const weatherConditionDescription = document.createElement("p");
    const weatherConditionIcon = document.createElement("img");

    weatherConditionIcon.src = `https:${this.iconSrc}`;
    weatherConditionDescription.textContent = this.conditionText;
    weatherConditionDescription.style.cssText =
      "font-size:1.3rem;font-weight:600;";
    weatherCondition.appendChild(weatherConditionDescription);
    weatherCondition.appendChild(weatherConditionIcon);
  }

  buildWind() {
    const weatherWind = document.querySelector("#wind");
    weatherWind.innerHTML = "";
    if (this.CorF === "C") {
      weatherWind.textContent = `Wind: ${this.windKPH} KM/H`;
    } else if (this.CorF === "F") {
      weatherWind.textContent = `Wind: ${this.windKPH} MP/H`;
    }
  }
}

class NextDayDOM {
  constructor(temp, conditionText, iconSrc, wind, CorF) {
    this.temp = temp;
    this.conditionText = conditionText;
    this.iconSrc = iconSrc;
    this.wind = wind;
    this.CorF = CorF;
    this.buildDom();
  }

  buildDom() {
    this.buildTemperature();
    this.buildCondition();
    this.buildWind();
  }

  buildTemperature() {
    const weatherTemp = document.querySelector("#temperatureTomo");
    weatherTemp.innerHTML = "";
    const tempActual = document.createElement("p");
    if (this.CorF === "C") {
      tempActual.textContent = `${this.temp} C`;
    } else if (this.CorF === "F") {
      tempActual.textContent = `${this.temp} F`;
    }
    tempActual.style.cssText = "font-size:1.3rem;font-weight:600;";

    weatherTemp.textContent = "Tomorrow";
    weatherTemp.style.cssText = "font-size:1.1rem;";
    weatherTemp.appendChild(tempActual);
  }

  buildCondition() {
    const weatherCondition = document.querySelector("#conditionsTomo");
    weatherCondition.innerHTML = "";
    const weatherConditionDescription = document.createElement("p");
    const weatherConditionIcon = document.createElement("img");

    weatherConditionIcon.src = `https:${this.iconSrc}`;
    weatherConditionDescription.textContent = this.conditionText;
    weatherConditionDescription.style.cssText =
      "font-size:1.3rem;font-weight:600;";
    weatherCondition.appendChild(weatherConditionDescription);
    weatherCondition.appendChild(weatherConditionIcon);
  }

  buildWind() {
    const weatherWind = document.querySelector("#windTomo");
    weatherWind.innerHTML = "";
    if (this.CorF === "C") {
      weatherWind.textContent = `Wind: ${this.wind} KM/H`;
    } else if (this.CorF === "F") {
      weatherWind.textContent = `Wind: ${this.wind} MP/H`;
    }
  }
}

class SearchButton {
  constructor(selectedCity) {
    this.city = selectedCity;
    this.inputField = document.querySelector("#selected_city");
    this.cfvalue = "C";
    this.button = document.querySelector("#searchButton");
    this.button.addEventListener("click", (event) => {
      event.preventDefault();
      reportWeather(this.inputField.value, this.cfvalue);
    });
    this.selectorButton = document.querySelector("#c_or_f");
    this.selectorListener();
  }

  selectorListener() {
    this.selectorButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.selectorButton.textContent === "F") {
        this.cfvalue = "F";
        this.selectorButton.textContent = "C";
        reportWeather(this.inputField.value, this.cfvalue);
      } else if (this.selectorButton.textContent === "C") {
        this.cfvalue = "C";
        this.selectorButton.textContent = "F";
        reportWeather(this.inputField.value, this.cfvalue);
      }
    });
  }
}

function reportWeather(selectedCity, CorF) {
  const weatherReport = new CurrentWeather(selectedCity);
  weatherReport.getWeather(CorF);
}

const thisButton = new SearchButton("Athens");
reportWeather("Athens", "C");
