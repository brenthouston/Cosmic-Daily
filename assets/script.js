var elem = document.querySelector('.collapsible');
var instance = M.Collapsible.init(elem, {
  accordion: false
});
var startDate = dayjs().format("YYYY-MM-DD");

  var datePicker = document.querySelector('.datepicker');
   M.Datepicker.init(datePicker, {});
   var datePicker2 = document.querySelector('#asteroid-date-search');
   M.Datepicker.init(datePicker2, {});


   var myBtn = document.getElementById("APOD-Search");
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
var asteroidUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startDate+"&end_date="+startDate+"&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5";
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
      document.getElementById("diam").textContent = "Estimated Diameter Range: " + minDiameter +" to " + maxDiameter + " Feet";
      var missDistance = approachData["0"].miss_distance.miles;
      document.getElementById("miss").textContent = "Miss Distance: " + missDistance + " Miles";
      var closeDate = approachData["0"].close_approach_date_full;
      document.getElementById("close").textContent = "Closest Approach Date and Time: " + closeDate;
      var speed = approachData["0"].relative_velocity.miles_per_hour;
      document.getElementById("speed").textContent = "Velocity: " + speed + " Miles Per Hour";
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
