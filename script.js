const apiKey = "1b1909191c02dbd3f039fa4578dada2c";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const toggleBtn = document.getElementById("toggleBtn");

async function getWeather(city){

if(city === ""){
  alert("Please enter a city name");
  return;
}

loading.classList.remove("hidden");

const response = await fetch(weatherURL + city + `&appid=${apiKey}`);

if(!response.ok){
  alert("City not found ❌");
  loading.classList.add("hidden");
  return;
}

const data = await response.json();

document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
document.getElementById("city").innerHTML = data.name.toUpperCase();
document.getElementById("feels").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";
document.getElementById("humidity").innerHTML = data.main.humidity + "%";
document.getElementById("wind").innerHTML = data.wind.speed + " Km/h";
document.getElementById("clouds").innerHTML = data.clouds.all + "%";

document.getElementById("icon").src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

changeBackground(data.weather[0].icon, data.main.temp);

getForecast(city);

loading.classList.add("hidden");
}

async function getForecast(city){

const response = await fetch(forecastURL + city + `&appid=${apiKey}`);
const data = await response.json();

const forecastDiv = document.getElementById("forecast");
forecastDiv.innerHTML = "";

for(let i=0;i<5;i++){
let day = data.list[i*8];

forecastDiv.innerHTML += `
<div>
<p>${new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
<p>${Math.round(day.main.temp)}°C</p>
</div>
`;
}
}

function changeBackground(icon, temp){

if(icon.includes("n")){
document.body.classList.add("night");
}else{
document.body.classList.remove("night");
}

if(temp <= 10){
document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1608889175123-8ee362508a2d')";
}
else if(temp > 10 && temp <= 25){
document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b')";
}
else{
document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')";
}

document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
}

toggleBtn.addEventListener("click", () => {
document.body.classList.toggle("night");
});

searchBtn.addEventListener("click",()=>{
getWeather(searchBox.value);
});