
// this for loop with carry data to HTML
for (var i = 0; i < localStorage.length; i++) {
// variable
  var city = localStorage.getItem(i);
  
  var cityName = $(".listing").addClass("list");

  cityName.append("<li>" + city + "</li>");
}
// intial variables
var searchButton = $(".button");

var apiKey = "e2f0832792862c8f0dface153081af37";

var keyCount = 0;
// click button event listner
searchButton.click(()=> {

  var userInput = $(".input").val();

//  variable for current day weather
  var today = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";
// variable for next five day weather
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";

// added condition on the absence and presence of user input
  if (userInput == "") {
      console.log(userInput);
  } else {
      $.ajax({
          url: today,
          method: "GET"
      }).then((response) => {
          // variable city name to append city name to the list
          var cityName = $(".list-group").addClass("list");
          cityName.append("<li>" + response.name + "</li>");
      //  this is teh local storage
          var local = localStorage.setItem(keyCount, response.name);
          keyCount = keyCount + 1;

        // append todays weather
          var currentCard = $(".currentCard").append("<div>").addClass("card-body");
          currentCard.empty();
          var currentName = currentCard.append("<p>");
         
          currentCard.append(currentName);

        //  time setting
          var timeUTC = new Date(response.dt * 1000);
          currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
          currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
       
          var currentTemp = currentName.append("<p>");
        // temperature here
          currentName.append(currentTemp);
          currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
       // humidity here
          currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
      //  wind speed here
          currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        // variable to get the UV index
          var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

        // get UV index
          $.ajax({
              url: urlUV,
              method: "GET"
          }).then(function (response) {

              var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
              currentUV.addClass("UV");
              currentTemp.append(currentUV);
             
          });

      });

      // get five day weather 
      $.ajax({
          url: fiveDay,
          method: "GET"
      }).then(function (response) {
        //  five day weather array
          var day = [0, 8, 16, 24, 32];
          var fiveDayCard = $(".fiveDayCard").addClass("card-body");
          var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
          fiveDayDiv.empty();
          // for each day
          day.forEach( (i) => {
              var UTC1 = new Date(response.list[i].dt * 1000);
             UTC1 = UTC1.toLocaleDateString("en-US");
              
              fiveDayDiv.append("<div class=cardColor>" + "<p>" + UTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


          })

      });
  }
});

