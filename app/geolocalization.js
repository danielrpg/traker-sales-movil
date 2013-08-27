App.Geolocalization = (function(lng, app, undefined){
	var latitude;
	var longitude;
	var initGeolocalization = function(){
		$$('#canvas_map').style("height","100%");
		$$('#canvas_map').style("width","100%");
		$$('#canvas_map').style("margin","0 auto");
		if(navigator.geolocation){
			initializa_map();
			initialize();	
		}else{
			lng.Notification.error(
			    "Error",                      //Title
			    "No soporta la geolocalizacion por favor instalar un navegador que soporte.",     //Description
			    "remove",                     //Icon
			    7,                            //Time on screen
			    afterExecuteError             //Callback function
			);
		}
	};
	var initializa_map = function(){
		var myOptions = {
	      zoom: 4,
	      mapTypeControl: true,
	      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
	      navigationControl: true,
	      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	      mapTypeId: google.maps.MapTypeId.ROADMAP      
	    };
	    map = new google.maps.Map(document.getElementById("canvas_map"), myOptions);	
	};

	var initialize = function(){
		if(geo_position_js.init())
		{
			//document.getElementById('current').innerHTML="Receiving...";
			lng.Notification.show();
			geo_position_js.getCurrentPosition(showMap,errorMap,{enableHighAccuracy:true});
		}
		else
		{
			//document.getElementById('current').innerHTML="Functionality not available";
			lng.Notification.error(
			    "Error",                      //Title
			    "No soporta la geolocalizacion por favor instalar un navegador que soporte.",     //Description
			    "remove",                     //Icon
			    7,                            //Time on screen
			    afterExecuteError             //Callback function
			);
		}
	};
	var afterExecuteError = function(){
		//document.getElementById('current').innerHTML="Couldn't get location"
	};
	var showMap = function (position){
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log(latitude+","+longitude);
		app.Services.setCurrentPos(latitude,longitude);
		var pos=new google.maps.LatLng(latitude, longitude);
		map.setCenter(pos);
		map.setZoom(16);
		var infowindow = new google.maps.InfoWindow({
		    content: "<strong>yes</strong>"
		});

		var marker = new google.maps.Marker({
		    position: pos,
		    map: map,
		    title:"You are here"
		});

		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		});
		lng.Notification.hide();
	};
	var errorMap = function(){
		//console.log();
	//	document.getElementById('current').innerHTML="Couldn't get location";
		lng.Notification.error(
		    "Error",                      //Title
		    "No se puede optener la localizacion.",     //Description
		    "remove",                     //Icon
		    7,                            //Time on screen
		    afterExecuteError             //Callback function
		);
	};
	return {
		initGeo : initGeolocalization
	}
})(Lungo, App);