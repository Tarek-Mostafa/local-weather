$.getJSON('https://ipinfo.io/geo', function(response) { 
	
	// Get Country and City
	var country = response.country;
	var city = response.city;
    
    // Get Geo Location 
    var loc = response.loc.split(',');
    var coords = {
        latitude: loc[0],
        longitude: loc[1]
    };
	
	longitude = coords.longitude;
	latitude = coords.latitude;
	
	// Get weather degree and state
	$.ajax({
		url: "//api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=5aa4502d6d6fd1a515d9197dcff31cfc",
		dataType: 'json',
		cache: false,
		success: function(data) {
			// Store api data to variables
			var temp_klvn = data.main.temp;
			var temp_cs = Math.floor(temp_klvn -273);
			var temp_fh =  Math.floor(temp_cs + 32);
			var description = data.weather[0].main;

			// Assign api data to node elements
			document.getElementById("temp_deg").innerHTML = temp_cs;
			document.getElementById("desc").innerHTML = description;
			$(".weather-img").attr('src', 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png');
			$(".weather-img").attr('title', data.weather[0].description);
			
			// Change degree unit on click
			$('#temp_unit').on('click', function(e){
				e.preventDefault();
			    if($(this).html() == "°C") {  
			    	$(this).html('°F');
			    	document.getElementById("temp_deg").innerHTML = temp_fh;
			    } else{
			    	$(this).html('°C');
			    	document.getElementById("temp_deg").innerHTML = temp_cs;
			    }
			});
		}
	});

	// Asign api country and city to node elements
	document.getElementById("country").innerHTML = city + ", " + country;

});
