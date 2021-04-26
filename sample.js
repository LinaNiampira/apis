"use strict";
let map;

//**var Bogota =document.getElementById('Bogota');**//
//** Bogota.addEventListener('Click',function ('Bogota') {})**//

function initMap() {


  //Se imprime el json



  $("#btnFetch").click(function(){

  })



  $("#ciudades").change(function () {
      var optionSelected = $(this).find("option:selected");
      var valueSelected = optionSelected.val(); //Nombre de ciudad
console.log(valueSelected)

//carag de datos
loadCity(valueSelected)
loadWeather(valueSelected)
loadCountryData(valueSelected)
loadCountryCovid(valueSelected)


  });
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.06263 , lng: 31.24967 },
    zoom: 5,
  });

function loadWeather(nameCity){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+nameCity+'&appid=becd8278c865cdb08238db3bdf46026b')
    .then(response => response.json())
    .then(data => {

      $("#state").text(data['weather'][0]['description'])
      $("#temp").text(data['main']['temp']+"°C")
      $("#max_temp").text(data['main']['temp_max']+"°F")
      $("#min_temp").text(data['main']['temp_min']+"°F")
      $("#country").text(data['sys']['country'])


    $("#jsonWheater").val(JSON.stringify(data))


    })
    .catch(err => alert("data: "+data))

  }

  function loadCountryData(nameCity){
    fetch('https://restcountries.eu/rest/v2/capital/'+nameCity)
      .then(response => response.json())
      .then(data => {


        console.log(JSON.stringify(data))

        var indivData = data[0];

        //llamado a la bandera
        document.getElementById('flagImg').src=indivData['flag']


        $("#countryName").text(indivData['name'])


        $("#capital").text(indivData['capital'])
        $("#dial_code").text("+"+indivData['callingCodes'][0])
        $("#population").text(indivData['population'])
        $("#currency").text(indivData['currencies'][0]['name'] + " ("+indivData['currencies'][0]['code']+")")
        $("#region").text(indivData['region'])
        $("#sub_region").text(indivData['subregion'])
      })
      .catch(err => alert("error: "+err))

    }


//load city
  function loadCity(nameCity) {

    console.log("carga ciudad")

      let locationCoord;
      switch (nameCity) {
        case "Bogota":locationCoord={ lat: 4.570868, lng :-74.297333}
        break;
        case "Asuncion": locationCoord= {lat: -23.442503 , lng:-58.443832 }
        break;
        case "Brasilia":locationCoord ={ lat: -15.7801, lng: -47.9292}
        break;
        case "Buenos Aires":locationCoord={lat: -34.61315, lng: -58.37723}
        break;
        case "Caracas":locationCoord= {lat: 10.48801, lng: -66.87919}
        break;
        case "Georgetown":locationCoord={lat: 6.80448, lng: -58.15527}
        break;
        case "Lima":locationCoord={lat: -12.04318, lng: -77.02824}
        break;
        case "Montevideo":locationCoord={lat: -34.90328,lng: -56.18816}
        break;
        case "Paramaribo":locationCoord={lat:5.86638 , lng:-55.16682}
        break;
        case "Quito":locationCoord={lat:-0.22985 , lng: -78.52495}
        break;
        case "Santiago de Chile":locationCoord={lat:-33.4569400, lng: -70.6482700}
        break;
        case "Sucre":locationCoord={lat: -19.03332, lng: -65.26274}
            break;

      }

      map = new google.maps.Map( document.getElementById("map"),{
        center: locationCoord,
        zoom:10,

          })

          //llamada a la API de Covid
function loadCountryCovid(country) {

fetch('https://covid-193.p.rapidapi.com/statistics?country='+country, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "6e6f3b66b4msh8b16b2064782850p1c9596jsnad932c8852d7",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => {
	console.log(JSON.stringify(data))
  var dataCov= data[0];
$("#countryName").text(dataCov['country'])
$("#cases").text(dataCov['new'])
$("#cases").text(dataCov['active'])
$("#cases").text(dataCov['critical'])
$("#cases").text(dataCov['recovered'])
$("#cases").text(dataCov['total'])
})
.catch(err => alert("error:"+err))

  }
}

}
