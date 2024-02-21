// https://github.com/amine-lotfi

const APIKey = "220816e1e2ca2c7ce412f65c72624b0e";

const cardContent = document.getElementById("card-content");
const card = document.getElementById("card");
const searchButton = document.getElementById("btn-search");
const cityName = document.getElementById("city-input");
// const locationText = document.getElementById("location-text");
// const stateImg = document.getElementById("img-stats");
// const tempText = document.getElementById("text-temp");
// const tempTextDesc = document.getElementById("text-temp-desc");
// const textHumidity = document.getElementById("text-humidity");
// const textWind = document.getElementById("text-wind");


searchButton.addEventListener("click", () => {

    if (cityName.value === "") {

        cardContent.innerHTML = `
                
                    <div class="warning-container mt-4 mb-4 get-animated">
                        <h5 class="text-warning mb-0 mt-2 fw-bol"><i class="bi bi-info-circle"></i> Enter a location.</h5>
                    </div>
                
                    `;

    } else {

        let APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=${APIKey}`;

        fetch(APIUrl)
            .then((response) => response.json())
            .then((data) => {

                if (data.cod === "404") {

                    cardContent.innerHTML = `
                
                    <div class="warning-container mt-4 mb-4 get-animated">
                        <img src="/assets/404-img.png" class="img-fluid w-50" alt="">
                        <h5 class="text-warning mb-0 mt-2"><i class="bi bi-info-circle"></i> Country was not found.</h5>
                    </div>
                
                    `;

                } else {

                    const weatherCondition = data.weather[0].main;
                    let iconUrl;

                    switch (weatherCondition) {
                        case 'Thunderstorm':
                            iconUrl = "thunderstorm.png";
                            break;
                        case 'Drizzle':
                            iconUrl = "drizzle.png";
                            break;
                        case 'Rain':
                            iconUrl = "rain.png";
                            break;
                        case 'Snow':
                            iconUrl = 'snow.png';
                            break;
                        case 'Mist':
                            iconUrl = 'mist.png';
                            break;
                        case 'Haze':
                            iconUrl = 'haze.png';
                            break;
                        case 'Fog':
                            iconUrl = 'fog.png';
                            break;
                        case 'Clear':
                            iconUrl = 'clear.png';
                            break;
                        case 'Clouds':
                            iconUrl = 'clouds.png';
                            break;
                        default:
                            iconUrl = 'default.png';
                            break;
                    }

                    // to use OpenWeatherMap icons
                    let openWeatherMapIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                    cardContent.innerHTML = `
                
                    <h2 class="text-light text-center mt-3 fw-bold get-animated" id="location-text"><i class="bi bi-geo-alt-fill me-2" style="font-size: 1.8rem;"></i>${data.name}</h2>

                    <div class="col mt-2 mb-2 get-animated">

                        <img src="assets/weather-icons/${iconUrl}" class="img-fluid w-50 mt-2 mb-2" id="img-stats" alt="Status">

                    </div>

                    <div class="col mb-5 mt-0 get-animated">
            
                        <div class="row">
                            <h1 class="text-light fw-bold mb-0" id="text-temp">${parseInt(data.main.temp)}°C</h1>
                            <p class="text-light mt-0" id="text-temp-desc">${capitalizeFirstLetter(data.weather[0].description)}</p>
                        </div>

                    </div>

                    <div class="card-footer get-animated">
            
                                <div class="row">
            
                                    <div class="col">
                                        <div class="row align-items-center">
            
                                            <div class="col">
                                                <img src="/assets/humidity.png" class="img-fluid w-75" alt="Status">
                                            </div>
            
                                            <div class="col">
                                                <div class="row">
                                                    <h5 class="text-light mb-0 fw-bold" id="text-humidity">${data.main.humidity}%</h5>
                                                </div>
                                                <div class="row">
                                                    <p class="text-light mb-0">Humidity</p>
                                                </div>
                                            </div>
            
                                        </div>
                                    </div>
            
                                    <div class="col">
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <img src="/assets/wind.png" class="img-fluid w-75" alt="Status">
                                            </div>
            
                                            <div class="col">
                                                <div class="row">
                                                    <h5 class="text-light mb-0 fw-bold" id="text-wind">${parseInt(data.wind.speed)}Km/h</h5>
                                                </div>
                                                <div class="row">
                                                    <p class="text-light mb-0">Wind</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            
                                </div>
            
                            </div>
                    
                    `;

                    // locationText.innerHTML = `<h2 class="text-light text-center mt-3 fw-bold" id="location-text"><i class="bi bi-geo-alt-fill me-2" style="font-size: 1.8rem;"></i>${data.name}</h2>`;

                    // stateImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                    // tempText.innerText = `${parseInt(data.main.temp)}°C`;

                    // tempTextDesc.innerText = `${capitalizeFirstLetter(data.weather[0].description)}`;

                    // textHumidity.innerText = `${data.main.humidity}%`;

                    // textWind.innerText = `${parseInt(data.wind.speed)}Km/h`;

                }

            }).catch(error => {
                console.error("Error fetching data", error);
            });

    }

});

// this to capitalize the first letter of the description
function capitalizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}

// this to add an event listener for the Enter key press event on the input field
cityName.addEventListener("keyup", function (event) {

    // check if the Enter key (key code 13) is pressed
    if (event.keyCode === 13) {

        // trigger a click event on the submit button
        searchButton.click();
    }
});