// Constantes para manipulação de elementos HTML
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Função para exibir ou ocultar o loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// Função para buscar os dados climáticos
const getWeatherData = async (city) => {
  toggleLoader();

  // URL da API do backend para obter dados climáticos
  const apiWeatherURL = `http://localhost:8800/weather?city=${city}`;

  try {
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    toggleLoader();
    return data;
  } catch (error) {
    toggleLoader();
    showErrorMessage();
    console.error("Erro ao buscar dados:", error);
  }
};

// Função para exibir a mensagem de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

// Função para ocultar as informações de erro e clima
const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
  suggestionContainer.classList.add("hide");
};

// Função para exibir os dados climáticos na tela
const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data) {
    // Verifique se os dados são da OpenWeather (com "cod" e "weather") ou da Weatherstack (com "current")
    if (data.cod === 200) {
      // Dados da OpenWeather
      cityElement.innerText = data.name;
      tempElement.innerText = parseInt(data.main.temp);
      descElement.innerText = data.weather[0].description;
      weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      // countryElement.innerText = data.sys.country;
      umidityElement.innerText = `${data.main.humidity}%`;
      windElement.innerText = `${data.wind.speed}km/h`;
    } else if (data.current) {
      // Dados da Weatherstack
      cityElement.innerText = data.location.name;
      tempElement.innerText = parseInt(data.current.temperature);
      descElement.innerText = data.current.weather_descriptions[0];
      weatherIconElement.setAttribute(
        "src",
        data.current.weather_icons[0]
      );
      // countryElement.innerText = data.location.country;
      umidityElement.innerText = `${data.current.humidity}%`;
      windElement.innerText = `${data.current.wind_speed}km/h`;
    }

    // Exibir os dados climáticos
    weatherContainer.classList.remove("hide");
  } else {
    showErrorMessage();
  }
};

// Ação ao clicar no botão de busca
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});

// Ação ao pressionar a tecla "Enter" no campo de entrada
cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});

// Sugestões de cidades
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");
    showWeatherData(city);
  });
});
