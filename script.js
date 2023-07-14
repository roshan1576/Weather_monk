let weather = {
    apiKey: "0f5ff9976f5777cca79b8f307427f7c6",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, feels_like, pressure } = data.main;
      const { speed } = data.wind;
      const {sunrise, sunset}=data.sys;
      

      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".feels_like").innerText =
        "Feels like: " + feels_like + "°C";
      document.querySelector(".pressure").innerText =
        "Pressure: " + pressure + "hpa";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".sunrise").innerText =
        "Sunrise: " + convert(sunrise);
      document.querySelector(".sunset").innerText =
        "Sunset: " + convert(sunset);
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + description + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });

  
  function convert(uni) {
    let unix = uni;
      let date = new Date(unix*1000);

      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      //var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      if(hours>12){
        var formattedTime = (hours-12) + ':' + minutes.substr(-2)+ "PM";
      }
      else{
      var formattedTime = hours + ':' + minutes.substr(-2)+ "AM";
      }

      return formattedTime;
    
  }