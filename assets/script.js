var elem = document.querySelector('.collapsible');
var asteroidPhoto = document.querySelector('#asteroid')
var instance = M.Collapsible.init(elem, {
  accordion: false
});
var startDate = dayjs().format("YYYY-MM-DD");
var asteroidDate = dayjs().format("YYYY-MM-DD");
var i = 0;
getPic();
renderAsteroid();
randomPhoto();
var datePicker = document.querySelector('.datepicker');
M.Datepicker.init(datePicker, {
  minDate: new Date(1995,5,20), 
  maxDate: new Date()
});
var datePicker2 = document.querySelector('#asteroid-date-search');
M.Datepicker.init(datePicker2, {});
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev");
nextBtn.addEventListener("click", function () {
  i++;
  renderAsteroid(); 
})
prevBtn.addEventListener("click", function (data) {
  i--;
 renderAsteroid();
})
var myBtn = document.getElementById("APOD-Search");
var myBtn2 = document.getElementById("Asteroid-Search");
myBtn2.addEventListener("click", function () {
  asteroidDate = datePicker2.value;
  renderAsteroid();
    })
myBtn.addEventListener("click", function () {
  var userDate = datePicker.value;
  startDate = dayjs(userDate).format("YYYY-MM-DD");
  getPic();
});
function randomPhoto() {
  ranNum = Math.floor(Math.random() * 9) + 1;
  asteroidPhoto.src = 'assets/images/asteroid-' + ranNum + '.png'
}
// Function to change asteroid data
function renderAsteroid(){
  var formatAsteroid = dayjs(asteroidDate).format("YYYY-MM-DD");
  var asteroidUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + formatAsteroid + "&end_date=" + formatAsteroid + "&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5";
  fetch(asteroidUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      {
        if(i>=data.element_count){
          i=0;
        } else if(i<0){
          i = data.element_count-1;
        }
        console.log(i);
        var asteroids = data.near_earth_objects;
        var dateForm = dayjs(asteroidDate).format("YYYY-MM-DD");
        var asteroidIndex = asteroids[dateForm][i];
        var approachData = asteroidIndex.close_approach_data;
        var orbitData = approachData["0"].orbiting_body;
        var diamData = asteroidIndex.estimated_diameter;
        var diam = diamData.feet;
        var maxDiameter = diam.estimated_diameter_max;
        var minDiameter = diam.estimated_diameter_min;
        document.getElementById("orbit").textContent = "Orbiting Body: " + orbitData;
        document.getElementById("diam").textContent = "Estimated Diameter Range: " + Math.round(minDiameter) + " to " + Math.round(maxDiameter) + " Feet";
        var missDistance = approachData["0"].miss_distance.miles;
        document.getElementById("miss").textContent = "Miss Distance: " + Math.round(missDistance) + " Miles";
        var closeDate = approachData["0"].close_approach_date_full;
        document.getElementById("close").textContent = "Closest Approach Date and Time: " + dayjs(closeDate).format("MMMM DD, YYYY hh:mm a");
        var speed = approachData["0"].relative_velocity.miles_per_hour;
        document.getElementById("speed").textContent = "Velocity: " + Math.round(speed) + " Miles Per Hour";
        var nameAsteroid = asteroidIndex.name;
        document.getElementById("asteroid-name").textContent = nameAsteroid;
      }
      randomPhoto();
    })
}
//function to change APOD image
function getPic(){
  var apodPic = "https://api.nasa.gov/planetary/apod?start_date=" + startDate + "&end_date=" + startDate + "&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5"
  fetch(apodPic)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var imgDesc = JSON.stringify(data[0].explanation);
      document.getElementsByClassName("collapsible-body")[0].innerHTML = imgDesc;
      var imgUrl = data[0].hdurl;
      var inputImg = document.getElementById("APOD");
      inputImg.firstElementChild.src = imgUrl;
      inputImg.firstElementChild.alt = "Space Image";
    })
}


