
var elem = document.querySelector('.collapsible');
var instance = M.Collapsible.init(elem, {
  accordion: false
});


  var elem = document.querySelector('.datepicker');
   M.Datepicker.init(elem, {});
   // valid dates 6/20/95 to present.
var startDate = "1995-06-20";
var endDate = "1995-06-20";
var elem = document.querySelector('.collapsible');
var instance = M.Collapsible.init(elem, {
  accordion: false
});
var asteroidUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startDate+"&end_date="+startDate+"&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5";
var apodPic = "https://api.nasa.gov/planetary/apod?start_date="+startDate+"&end_date="+startDate+"&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5"
fetch(asteroidUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var asteroids = data.near_earth_objects;
      console.log(asteroids);
    })
    fetch(apodPic)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     var imgDesc = JSON.stringify(data[0].explanation);
     document.getElementsByClassName("collapsible-body")[0].innerHTML = imgDesc;
     console.log(data);
     var imgUrl = data[0].hdurl;
     console.log(imgUrl);
      var inputImg = document.getElementById("APOD");
      inputImg.firstElementChild.src =imgUrl;
      inputImg.firstElementChild.alt = "Space Image";
    })