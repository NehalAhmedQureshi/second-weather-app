let APIkey = '4abbcbb602e8a4993b77db39725fa48c';
let form = document.querySelector("#form");
let input = document.querySelector('#city');
let loading = document.querySelector('.message');
let cityName = document.querySelector('.cityName');
let temp = document.querySelector('#temp')
let dayType = document.querySelector('.dayType')
let humidity = document.querySelector('#humidity')
let wind = document.querySelector('#wind')
let wheatherIcon = document.querySelector('.wheatherIcon')
let Celcius = document.querySelector('#celcius')
let percent = document.querySelector('#percent')
// let humid = document.querySelector('#humidity')
let meter = document.querySelector('#meter')
let none = document.querySelector('.wheather-div')
let humidityIcon = document.querySelector('#humidityIcon')
let windIcon = document.querySelector('#windIcon')


// hide wheather div
none.style.display = 'none'

// write a set time function which run after two second
// setTimeout(() => {
//     swal("Good job!", "You clicked the button!", "error");
// },2000)

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {

        // empty all input for getting wheather
        cityName.innerHTML = ''
        temp.innerHTML = ''
        //   cityName.innerHTML = ''
        humidity.innerHTML = ''
        //   wind.innerHTML = ''
        wind.innerHTML = ''
        dayType.innerHTML = ''
        Celcius.innerHTML = ''
        percent.innerHTML = ''
        meter.innerHTML = ''
        wheatherIcon.src = ''

        // show wheather div
        none.style.display = 'flex'


        // show loading and get input value 
        loading.innerHTML = 'loading...';


        // fetch api and convert in json
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIkey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        // Clear the loading message  && input field
        loading.innerHTML = '';
        form.reset()

        // show values
        cityName.innerHTML = data.name;
        temp.innerHTML = Math.floor(data.main.temp - 273.15)
        humidity.innerHTML = data.main.humidity
        wind.innerHTML = data.wind.speed
        dayType.innerHTML = data.weather[0].description
        Celcius.innerHTML = '℃'
        percent.innerHTML = '%'
        meter.innerHTML = 'km/h'

        // show icon 

        let iconCode = data.weather[0].icon
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
        wheatherIcon.src = iconUrl

        //  ℃


    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);

        // hide wheather div
        none.style.display = 'none'

        swal("Error!", "Enter valid city name!", "error");
        humidityIcon.style.display = 'none'
        windIcon.style.display = 'none'

    }
});
