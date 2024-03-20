
    const apiKey = "18e4f40917ee7e45439f4d6a7ecd01b5";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city){
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".card").style.background = "#FF5733";
      }
      else{
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed +" km/h";

        switch (data.weather[0].main) {
          case "Clear":
            document.body.className = 'weather-clear';
            document.querySelector(".card").style.background = "#FFA500";
            break;
          case "Rain":
            document.body.className = 'weather-rain';
            document.querySelector(".card").style.background = "#808080";
            break;
          case "Drizzle":
          case "Mist":
            document.body.className = 'weather-drizzle';
            document.querySelector(".card").style.background = "#6C7A89";
            break;
          case "Clouds":
            document.body.className = 'weather-clouds';
            document.querySelector(".card").style.background = "#3498DB";
            break;
          default:
            document.body.className = '';
            document.querySelector(".card").style.background = "#FFFFFF";
            break;
        }

        if(data.weather[0].main == "Clouds"){
          weatherIcon.src = "images/cloud.png"
        }
        else if(data.weather[0].main == "Clear"){
          weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
          weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle"){
          weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
          weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
      }
    }

    searchBtn.addEventListener("click", ()=>{
      checkWeather(searchBox.value)
      searchBox.value = "";
    })

    function handleSubmit(event) {
      event.preventDefault();
    
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      alert("Thank you for your feedback!");
    }
    document.getElementById("contact-form").addEventListener("submit", handleSubmit);

