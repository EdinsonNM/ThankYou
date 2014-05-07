define(['express','module','path','crypto','../models/user'],function(express,module,path,crypto,userDB){
	var app=express();
	app.use(express.cookieParser('0123456789qwerty'));
	app.use(express.session());
	app.set('views', path.join(path.dirname(module.uri), 'views'));

	app.get('/login', function(request, response) {
 		console.log("get /login");
		response.render('login', {
		    title: 'Inicio de Sesión'
		});
	 
	});

	app.post('/login', function(req, res) {
    	var shaSum = crypto.createHash('sha256');
    	shaSum.update(req.body.password);
    	userDB.findOne({email:req.body.email,password:shaSum.digest('hex')},function(err,user){
	     	if(user) {
	     		req.session.regenerate(function(){
      		        req.session.user = user;
			        req.session.success = 'Authenticated as ' + user.name
			          + ' click to <a href="/logout">logout</a>. '
			          + ' You may now access <a href="/restricted">/restricted</a>.';
        			res.send(user);
	       		});
	      	} else {
	       		res.send({"message":"Usuario o clave incorrecto"});
	      	}
    	});
	});

	app.get('/logout', function(req, res){
	  // destroy the user's session to log them out
	  // will be re-created next request
	  req.session.destroy(function(){
	    res.redirect('/');
	  });
	});
	return app;
});

 
