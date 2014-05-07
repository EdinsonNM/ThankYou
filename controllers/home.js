define(['express','module','path'],function(express,module,path){
	var app=express();
	app.configure(function(){
		console.log(module.uri);
		app.set('views', path.join(path.dirname(module.uri), 'views'));
	});
	console.log("cargando modulo home");
	
	app.get('/', function(request, response) {
 		console.log("get /");
		response.render('index', {
		    title: 'Hola, desde el controlador de home'
		});
	 
	});
	return app;
});

 
