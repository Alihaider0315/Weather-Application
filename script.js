let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let dayVideo = document.getElementById("dayVideo");
let nightVideo = document.getElementById("nightVideo");
let rainyVideo = document.getElementById("rainyVideo");

// Function to fetch weather details from API and display them
let getWeather = () => {
  let cityValue = cityRef.value;

  // If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    // Clear the input field
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
        `;

        const sunriseUTC = new Date(data.sys.sunrise * 1000);
        const sunsetUTC = new Date(data.sys.sunset * 1000);
        const currentUTC = new Date();
        const isDaytime = currentUTC >= sunriseUTC && currentUTC <= sunsetUTC;

        if (data.weather[0].main === "Clear" || data.weather[0].main === "Clouds") {
          if (isDaytime) {
            dayVideo.style.display = "block";
            nightVideo.style.display = "none";
            rainyVideo.style.display = "none";
          } else {
            dayVideo.style.display = "none";
            nightVideo.style.display = "block";
            rainyVideo.style.display = "none";
          }
        } else if (data.weather[0].main === "Rain") {
          dayVideo.style.display = "none";
          nightVideo.style.display = "none";
          rainyVideo.style.display = "block";
        } else {
          dayVideo.style.display = "none";
          nightVideo.style.display = "none";
          rainyVideo.style.display = "none";
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
