var elem = document.querySelector('.collapsible');
var asteroidPhoto = document.querySelector('#asteroid')
var instance = M.Collapsible.init(elem, {
  accordion: false
});
var startDate = dayjs().format("YYYY-MM-DD");
var asteroidDate = dayjs().format("YYYY-MM-DD");

  var datePicker = document.querySelector('.datepicker');
   M.Datepicker.init(datePicker, {});
   var datePicker2 = document.querySelector('#asteroid-date-search');
   M.Datepicker.init(datePicker2, {});
   var myBtn = document.getElementById("APOD-Search");
   var myBtn2 = document.getElementById("Asteroid-Search");
   myBtn2.addEventListener("click",function(){
    asteroidDate = datePicker2.value;
     var formatAsteroid = dayjs(asteroidDate).format("YYYY-MM-DD");
    var asteroidUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+formatAsteroid+"&end_date="+formatAsteroid+"&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5";
    fetch(asteroidUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var asteroids = data.near_earth_objects;
      var asteroidIndex = asteroids[formatAsteroid][0];
      var approachData = asteroidIndex.close_approach_data;
      var orbitData = approachData["0"].orbiting_body;
      var diamData = asteroids[formatAsteroid][0].estimated_diameter;
      var diam = diamData.feet;
      var maxDiameter = diam.estimated_diameter_max;
      var minDiameter = diam.estimated_diameter_min;
      document.getElementById("orbit").textContent = "Orbiting Body: " +orbitData;
      document.getElementById("diam").textContent = "Estimated Diameter Range: " + Math.round(minDiameter) +" to " + Math.round(maxDiameter) + " Feet";
      var missDistance = approachData["0"].miss_distance.miles;
      document.getElementById("miss").textContent = "Miss Distance: " + Math.round(missDistance) + " Miles";
      var closeDate = approachData["0"].close_approach_date_full;
      document.getElementById("close").textContent = "Closest Approach Date and Time: " + dayjs(closeDate).format("MMMM dddd, YYYY hh:mm a");
      var speed = approachData["0"].relative_velocity.miles_per_hour;
      document.getElementById("speed").textContent = "Velocity: " + Math.round(speed) + " Miles Per Hour";
      var nameAsteroid = asteroidIndex.name;
      document.getElementById("asteroid-name").textContent = nameAsteroid;
    })
  })
   myBtn.addEventListener("click", function(){
    var userDate = datePicker.value;
    startDate = dayjs(userDate).format("YYYY-MM-DD");
    var apodPic = "https://api.nasa.gov/planetary/apod?start_date="+startDate+"&end_date="+startDate+"&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5"
    fetch(apodPic)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     var imgDesc = JSON.stringify(data[0].explanation);
     document.getElementsByClassName("collapsible-body")[0].innerHTML = imgDesc;
     var imgUrl = data[0].hdurl;
      var inputImg = document.getElementById("APOD");
      inputImg.firstElementChild.src =imgUrl;
      inputImg.firstElementChild.alt = "Space Image";
    })
   });
  
   // valid dates 6/20/95 to present.
var asteroidUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+asteroidDate+"&end_date="+asteroidDate+"&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5";
var apodPic = "https://api.nasa.gov/planetary/apod?start_date="+startDate+"&end_date="+startDate+"&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5"
fetch(asteroidUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var asteroids = data.near_earth_objects;
      var asteroidIndex = asteroids[startDate][0];
      var approachData = asteroidIndex.close_approach_data;
      var orbitData = approachData["0"].orbiting_body;
      var diamData = asteroids[startDate][0].estimated_diameter;
      var diam = diamData.feet;
      var maxDiameter = diam.estimated_diameter_max;
      var minDiameter = diam.estimated_diameter_min;
      document.getElementById("orbit").textContent = "Orbiting Body: " +orbitData;
      document.getElementById("diam").textContent = "Estimated Diameter Range: " + Math.round(minDiameter) +" to " + Math.round(maxDiameter) + " Feet";
      var missDistance = approachData["0"].miss_distance.miles;
      document.getElementById("miss").textContent = "Miss Distance: " + Math.round(missDistance) + " Miles";
      var closeDate = approachData["0"].close_approach_date_full;
      document.getElementById("close").textContent = "Closest Approach Date and Time: " + dayjs(closeDate).format("MMMM , YYYY hh:mm a");
      var speed = approachData["0"].relative_velocity.miles_per_hour;
      document.getElementById("speed").textContent = "Velocity: " + Math.round(speed) + " Miles Per Hour";
      var nameAsteroid = asteroidIndex.name;
      document.getElementById("asteroid-name").textContent = nameAsteroid;
    })
    fetch(apodPic)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     var imgDesc = JSON.stringify(data[0].explanation);
     document.getElementsByClassName("collapsible-body")[0].innerHTML = imgDesc;
     var imgUrl = data[0].hdurl;
      var inputImg = document.getElementById("APOD");
      inputImg.firstElementChild.src =imgUrl;
      inputImg.firstElementChild.alt = "Space Image";
    })


    function randomPhoto(){
      ranNum = Math.floor(Math.random() * 10)
      console.log(ranNum)
      asteroidPhoto.src = 'assets/images/asteroid-'+ranNum+'.png'
    }
    randomPhoto()