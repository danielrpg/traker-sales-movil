var url = "http://localhost:3000/";
App.Services=(function(lng, app, undefined){
	// Metodo que permite loguear en el sistema
	var loginUsuario = function(login, password){
		lng.Service.get(url+'loginUsuario/'+login+'/'+password, {}, responseLogin, "json");
	};
	// Esta es la respuesta cuando es true
	var responseLogin = function(res){
		//console.log(res);
		if(res.complet){
			lng.Router.section("main-app-traker");
			app.Geolocalization.initGeo();
		}else{
			lng.Notification.error(
			    "Error",                      //Title
			    "El usuario no existe en el sistema",     //Description
			    "remove",                     //Icon
			    7,                            //Time on screen
			    afterExecuteError             //Callback function
			);
		}
		
	};
	// Despues del error 
	var afterExecuteError = function(){

	};
    // Enviar los datos al servidor latitude y longitude
    var setCurrentPos = function(latitude, longitude){
    	lng.Service.post(url+"setCurrentPosition", {usr:$$('#login-usuario').val(),pass:$$('#contrasena-usuario').val(),latitude:latitude, longitude:longitude}, successReponse, "json");
    };
    var successReponse = function(response){
    	console.log(response);
    };
	return{
		loginUsuario : loginUsuario,
		setCurrentPos : setCurrentPos
	}
})(Lungo, App);