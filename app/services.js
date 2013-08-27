var url = "http://10.0.0.4:3000/";
var codigo_operador;
App.Services=(function(lng, app, undefined){
	var socket = io.connect(url);
	// Metodo que permite loguear en el sistema
	var loginUsuario = function(login, password){
		lng.Service.get(url+'loginOperador/'+login+'/'+password, {}, responseLogin, "json");
	};
	// Esta es la respuesta cuando es true
	var responseLogin = function(res){
		//console.log(res);
		if(res.complet){
			lng.Router.section("main-app-traker");
			app.Geolocalization.initGeo();
			codigo_operador = res.codigo_operador;
			//console.log(socket);
			socket.emit('nuevoUsuario', {login:$$('#login-usuario').val(), codigo_op:codigo_operador}, function(data){
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
    	lng.Service.post(url+"setCurrentPosition", {codigo_operador:codigo_operador,latitude:latitude, longitude:longitude}, successReponse, "json");
    	socket.emit('compartirPoscion',{lat:latitude, lon:longitude, cod_op:codigo_operador});
    };
    var successReponse = function(response){
    	console.log(response);
    };
	return{
		loginUsuario : loginUsuario,
		setCurrentPos : setCurrentPos
	}
})(Lungo, App);