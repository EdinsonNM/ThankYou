define(['express','module','path','../models/user'],function(express,module,path,userDB){
	var app=express();

	app.get('/user', function(req, res) {
	  userDB.find(function(err, obj) {
	      if(!err) {
	        console.log(obj);
	        res.send(obj);
	      } else {
	        console.log('ERROR: ' + err);
	      }
	    });
	});

	app.post('/user', function(req, res) {
		console.log('POST');
	    console.log(req.body);
	    var shaSum = crypto.createHash('sha256');
	    shaSum.update(req.body.password);
	    var user = new userDB({
	      email:    req.body.email,
	      password: shaSum.digest('hex')
	    
	    });

	    user.save(function(err) {
	      if(!err) {
	        console.log('Created');
	      } else {
	        console.log('ERROR: ' + err);
	      }
	    });

	    res.send(user);
	});


	
	return app;
});

 
