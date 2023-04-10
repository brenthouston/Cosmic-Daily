APODrequestURL = 'https://api.nasa.gov/planetary/apod?api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5'
troidURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=wgpRXAaMzhMljw8IdBCicL4wTtHKvjyaGzDIe7a5'
fetch()
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)

  })