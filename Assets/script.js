const apiKey = "92fc842082975cda7c600e6974674317"
//search selectors
let searchInput = document.querySelector("#search-input")
let searchButton = document.querySelector("#search-button")
//most upcoming weather
let cityName = document.querySelector("#city-name")
let date = document.querySelector("#date")
let temp = document.querySelector("#temp")
let windSpeed = document.querySelector("#wind")
let humidity = document.querySelector("#humidity")
// day 1 of 5 day forecast selectors from left to right
let date1 = document.querySelector("#date1")
let temp1 = document.querySelector("#temp1")
let windSpeed1 = document.querySelector("#wind1")
let humidity1 = document.querySelector("#humidity1")
let img1 = document.querySelector("#img1")
//day 2
let date2 = document.querySelector("#date2")
let temp2 = document.querySelector("#temp2")
let windSpeed2 = document.querySelector("#wind2")
let humidity2 = document.querySelector("#humidity2")
//day 3
let date3 = document.querySelector("#date3")
let temp3 = document.querySelector("#temp3")
let windSpeed3 = document.querySelector("#wind3")
let humidity3 = document.querySelector("#humidity3")
//day 4
let date4 = document.querySelector("#date4")
let temp4 = document.querySelector("#temp4")
let windSpeed4 = document.querySelector("#wind4")
let humidity4 = document.querySelector("#humidity4")
//day 5 (Wont always be 24hrs from day 4, sometimes slightly less) 
let date5 = document.querySelector("#date5")
let temp5 = document.querySelector("#temp5")
let windSpeed5 = document.querySelector("#wind5")
let humidity5 = document.querySelector("#humidity5")
//array to push saved city names to
previousSearch = []
//set global variable for the unordered list
let cityList = document.querySelector(".ul-list")

//performs search on click
searchButton.addEventListener("click", performSearch);
//performs search and sets the city search = to whats in the input or the created button's value is
function performSearch (event) {
  let citySearch = ""
  if (event.target.innerText !== "Search") {
    citySearch = event.target.value
  } else citySearch = searchInput.value

    console.log(citySearch)
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`

        fetch(url)
          .then(function (response) {
            
            return response.json();
          })

          .then(function (data) {
            console.log(data);
            //puts the information from the api in their respective places
            cityName.textContent = "Location: " + data.city.name
            date.textContent = "Date & Time: " + data.list[0].dt_txt
            temp.textContent = "Temperature: " + data.list[0].main.temp + " °F"
            windSpeed.textContent = "Wind Speed: " + data.list[0].wind.speed + " MPH"
            humidity.textContent = "Humidity: " + data.list[0].main.humidity + " %"

            date1.textContent = "Date & Time: " + data.list[8].dt_txt
            temp1.textContent = "Temperature: " + data.list[8].main.temp + " °F"
            windSpeed1.textContent = "Wind Speed: " + data.list[8].wind.speed + " MPH"
            humidity1.textContent = "Humidity: " + data.list[8].main.humidity + " %"

            date2.textContent = "Date & Time: " + data.list[16].dt_txt
            temp2.textContent = "Temperature: " + data.list[16].main.temp + " °F"
            windSpeed2.textContent = "Wind Speed: " + data.list[16].wind.speed + " MPH"
            humidity2.textContent = "Humidity: " + data.list[16].main.humidity + " %"

            date3.textContent = "Date & Time: " + data.list[24].dt_txt
            temp3.textContent = "Temperature: " + data.list[24].main.temp + " °F"
            windSpeed3.textContent = "Wind Speed: " + data.list[24].wind.speed + " MPH"
            humidity3.textContent = "Humidity: " + data.list[24].main.humidity + " %"

            date4.textContent = "Date & Time: " + data.list[32].dt_txt
            temp4.textContent = "Temperature: " + data.list[32].main.temp + " °F"
            windSpeed4.textContent = "Wind Speed: " + data.list[32].wind.speed + " MPH"
            humidity4.textContent = "Humidity: " + data.list[32].main.humidity + " %"

            date5.textContent = "Date & Time: " + data.list[39].dt_txt
            temp5.textContent = "Temperature: " + data.list[39].main.temp + " °F"
            windSpeed5.textContent = "Wind Speed: " + data.list[39].wind.speed + " MPH"
            humidity5.textContent = "Humidity: " + data.list[39].main.humidity + " %"      
          });
          saveHistory();
        };

        //saves previous searches to local storage
        function saveHistory() {

          if (previousSearch.includes(searchInput.value) === false) {
            previousSearch.push(searchInput.value)
        
            localStorage.setItem('previousCities', JSON.stringify(previousSearch))
            createButton();
          };
        };
        
        //creates a new button with the value of the searched content
        function createButton() {
          cityList.innerHTML = ""
          for (let i = 0; i < previousSearch.length; i++) {
            let newButton = document.createElement("button")
        
            newButton.setAttribute("class", "btn-info btn m-2")
            newButton.setAttribute("value", previousSearch[i])
            newButton.textContent = previousSearch[i]
            newButton.addEventListener("click", performSearch)
            cityList.appendChild(newButton)
          };
        };
        
        //loads local storage and creates a button for past searches
        function loadButton() {
          let history = localStorage.getItem("previousCities")
        
          if (history) {
            previousSearch = JSON.parse(history)
          };
        
          createButton();
        };

        loadButton();
        //http://openweathermap.org/img/wn/${imgid}@2x.png