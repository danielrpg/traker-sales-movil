App.Geolocalization = (function(lng, app, undefined){
	var latitude;
	var longitude;
	var codigoUsuario;
	var loginUsuario;
	var socket;
	var timer=setInterval()
	var initGeolocalization = function(codigo, login, sock){
		codigoUsuario = codigo;
		loginUsuario = login;
		socket = sock;
		$$('#canvas_map').style("height","80%");
		$$('#canvas_map').style("width","100%");
		if(navigator.geolocation){
			lng.Notification.show();
			var options = {enableHighAccuracy:true, maximumAge:30000, timeout:27000};
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
		socket.emit('nuevoUsuario', {login:loginUsuario,codigo_op:codigoUsuario, latitude:latitude, longitude:longitude}, function(data){
			if(data){
				console.log('El usuario se ha añadido correctamente');
			}else{
				lng.Notification.error(
				    "Error",                      //Title
				    "El login de usuario ya esta siendo usado por otro",     //Description
				    "remove",                     //Icon
				    7,                            //Time on screen
				    afterExecuteError             //Callback function
				);
			}
		});
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
	// Despues del error 
	var afterExecuteError = function(){

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

	var getLatitude = function(){
		return latitude;
	};

	var getLongitude = function(){
		return longitude;
	};
	return {
		initGeo : initGeolocalization,
		getLatitude : getLatitude,
		getLongitude : getLongitude
	}
})(Lungo, App);