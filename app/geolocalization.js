App.Geolocalization = (function(lng, app, undefined){
	var latitude;
	var longitude;
	var initGeolocalization = function(){
		$$('#canvas_map').style("height","80%");
		$$('#canvas_map').style("width","100%");
		if(navigator.geolocation){
			lng.Notification.show();
			var options = {timeout: 10000, maximumAge: 11000, enableHighAccuracy: true };
			navigator.geolocation.watchPosition(showMap, errorMap, options);
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

	var afterExecuteError = function(){
		//document.getElementById('current').innerHTML="Couldn't get location"
	};
	var showMap = function (position){
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log(latitude+","+longitude);
		app.Services.setCurrentPos(latitude,longitude);
		var pos=new google.maps.LatLng(latitude, longitude);
		var opciones = {
			zoom:16,
			center:pos,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		};
		var mapa = new google.maps.Map(document.getElementById('canvas_map'), opciones);
		var opcMark = {
			position : pos,
			map : mapa,
			title : 'Coordenada de Casa'
		};
		var mak = new google.maps.Marker(opcMark);
		lng.Notification.hide();
	};
	var errorMap = function(){
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