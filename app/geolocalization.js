App.Geolocalization = (function(lng, app, undefined){
	var latitude;
	var longitude;
	var initGeolocalization = function(){
		navigator.geolocation.getCurrentPosition(showMap, errorMap)
	};
	var showMap = function (position){
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log(latitude+","+longitude);
		app.Services.setCurrentPos(latitude,longitude);
		$$('#canvas_map').style("height","100%");
		$$('#canvas_map').style("width","100%");
		$$('#canvas_map').style("margin","0 auto");
		var coords = new google.maps.LatLng(latitude, longitude);
		var options = {
			zoom:16,
			center:coords,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		};
		var mapa = new google.maps.Map(document.getElementById('canvas_map'), options);
		var opMark = {
			position : coords,
			map : mapa,
			title : 'Coordenada de Casa'
		};
		var mark = new google.maps.Marker(opMark);
	};
	var errorMap = function(err){
		console.error(err);
	};
	return {
		initGeo : initGeolocalization
	}
})(Lungo, App);