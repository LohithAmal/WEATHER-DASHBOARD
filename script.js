
// for loop to carry data to HTML
for (var i = 0; i < localStorage.length; i++) {

  var city = localStorage.getItem(i);
 
  var cityName = $(".listing").addClass("list");

  cityName.append("<li>" + city + "</li>");
}

var searchButton = $(".button");

var apiKey = "e2f0832792862c8f0dface153081af37";

var keyCount = 0;
// Key count for local storage 

// Search button click event
searchButton.click(()=> {

  var userInput = $(".input").val();

  // Variable for current weather working 
  var today = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";
  // Variable for 5 day forecast working
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";


  if (userInput == "") {
      console.log(userInput);
  } else {
      $.ajax({
          url: today,
          method: "GET"
      }).then((response) => {
          // list-group append an li to it with just set text
          // console.log(response.name);
          var cityName = $(".list-group").addClass("list");
          cityName.append("<li>" + response.name + "</li>");
          // Local storage
          var local = localStorage.setItem(keyCount, response.name);
          keyCount = keyCount + 1;

          // Start Current Weather append 
          var currentCard = $(".currentCard").append("<div>").addClass("card-body");
          currentCard.empty();
          var currentName = currentCard.append("<p>");
          
          currentCard.append(currentName);

          // Adjust Date 
          var timeUTC = new Date(response.dt * 1000);
          currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
          currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
          // Add Temp 
          var currentTemp = currentName.append("<p>");
          // .addClass("card-text");
          currentName.append(currentTemp);
          currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
          // Add Humidity
          currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
          // // Add Wind Speed: 
          currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

          // UV Index URL
          var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

          // UV Index
          $.ajax({
              url: urlUV,
              method: "GET"
          }).then(function (response) {

              var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
              currentUV.addClass("UV");
              currentTemp.append(currentUV);
              // currentUV.append("UV Index: " + response.value);
          });

      });

      // Start call for 5-day forecast 
      $.ajax({
          url: fiveDay,
          method: "GET"
      }).then(function (response) {
          // Array for 5-days 
          var day = [0, 8, 16, 24, 32];
          var fiveDayCard = $(".fiveDayCard").addClass("card-body");
          var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
          fiveDayDiv.empty();
          // For each for 5 days
          day.forEach( (i) => {
              var UTC1 = new Date(response.list[i].dt * 1000);
             UTC1 = UTC1.toLocaleDateString("en-US");

              fiveDayDiv.append("<div class=cardColor>" + "<p>" + UTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


          })

      });
  }
});
