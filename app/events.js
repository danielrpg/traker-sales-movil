App.Events = (function(lng, app){
    lng.dom('section#splash article#login-article div.form button').tap(function(evt) {
    	if($$('#login-usuario').val()===""){
    		//console.log('el usuario no puede estar vacio');
			lng.Notification.error(
			    "Error",                      //Title
			    "El usuario no puede estar vacio",     //Description
			    "remove",                     //Icon
			    7,                            //Time on screen
			    despuesEjcucionError             //Callback function
			);
    	}else if($$('#contrasena-usuario').val()===""){
    		lng.Notification.error(
			    "Error",                      //Title
			    "El contraseña no puede estar vacio",     //Description
			    "remove",                     //Icon
			    7,                            //Time on screen
			    despuesEjcucionError             //Callback function
			);
    	}else{
    		lng.Notification.success(
			    "Success",                  //Title
			    "Usuario correcto",     //Description
			    "check",                    //Icon
			    1,                          //Time on screen
			    ejecutarUsuarioCorrecto           //Callback function
			);
    	}
    });
	/**  Metodo que permite verificar el usuario**/
	var ejecutarUsuarioCorrecto = function(){
		lng.Notification.hide();
		app.Services.loginUsuario($$('#login-usuario').val(),$$('#contrasena-usuario').val());
	};
	// despues de ajecucion del error **/
    var despuesEjcucionError = function(){
	   console.log('Despues del error');
	};

	return {

	}
})(Lungo, App);