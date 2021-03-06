// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//helper methods
//removeFromArray: function(item, array)
//{
//	var index = array.indexOf(item);
//	array.splice(index, 1);
//	return array;
//}

var mongoose   = require('mongoose');
mongoose.connect('mongodb://moscato:testdatabase1@ds011369.mlab.com:11369/moscato', function (error) {
  // Do things once connected
  if(error)
  {
	  console.log(error);
  }
  console.log(mongoose.connection.readyState);
});// connect to our database
var Bear     = require('./app/models/bear');
var User     = require('./app/models/user');
var Post     = require('./app/models/post');

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.route('/profile/:userID')

    // get the profile with that id (accessed at GET http://localhost:8080/api/profile/userID)
    .get(function(req, res) {
        User.findById(req.params.userID, function(err, person) {
			
            if (err)
                res.send(err);
			
			var user = new User();
			user.name = person.name;
			user.age = person.age;
			user.occupation = person.occupation;
			user.company = person.company;
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.json(user);
        });
    });

router.route('/myProfile/:userID/token/:token')

    // get the profile with that id (accessed at GET http://localhost:8080/api/myProfile/userID/token/token)
    .get(function(req, res) {
        User.findById(req.params.userID, function(err, person) {
			
            if (err)
                res.send(err);
			if(req.params.token == person.token)
			{
				var user = new User();
				user.name = person.name;
				user.age = person.age;
				user.occupation = person.occupation;
				user.company = person.company;
				user.posts = person.posts;
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				res.json(user);
			}
			else
			{
				res.json({message: "Invalid Token"});
			}
        });
    });
	
	router.route('/post')
	
    // edit user profile (accessed at POST http://localhost:8080/api/post)
    .post(function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				
		User.findById(req.body.userIdx, function(err, person) {
			
            if (err)
                res.send(err);
			if(req.body.token == person.token)
			{
				var post = new Post();
				post.userIdx = req.body.userIdx;
				post.activity = req.body.activity;
				post.place = req.body.place;
				post.meet = req.body.meet;
				post.finish = req.body.finish;
				post.msg = req.body.msg;
				post.save(function(err, posted) {
				if (err)
				{
					res.send(err);
					console.log(err);
				}

				res.json({ message: 'Post created!' , success: '1'});
				console.log("Post created!");
				var myarr = person.posts;
				myarr.push(posted._id);
				person.posts = myarr;
				var myarr2 = person.seen;
				myarr2.push(posted._id);
				person.seen = myarr2;
				
				person.save(function(err, posted) {
				if (err)
				{
					res.send(err);
					console.log(err);
				}
				});
				});
				
				
				
			}
			else
			{
				res.json({message: "Invalid Token"});
			}
        });
		
        
        
    });
	
	
	router.route('/postInterest')
	
    // edit post interest list (accessed at POST http://localhost:8080/api/postInterest)
    .post(function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				
		User.findById(req.body.userIdx, function(err, person) {
			
            if (err)
                res.send(err);
			if(req.body.token == person.token)
			{
				Post.findById(req.body.postIdx, function(err, post) {
					if (err)
						res.send(err);
					var interestArray = post.interest;
					interestArray.push(req.body.userIdx);
					post.interest = interestArray;
					post.save(function(err, posted) {
					if (err)
					{
						res.send(err);
						console.log(err);
					}

					res.json({ message: 'Interest added!' , success: '1'});
					console.log("Interest added!");
					});
					
				});
				
			}
			else
			{
				res.json({message: "Invalid Token"});
			}
        });
		
        
        
    });
	
	router.route('/post/:userID/token/:token')
	.get(function(req, res) {
        User.findById(req.params.userID, function(err, person) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
							
            if (err)
                res.send(err);
			if(req.params.token == person.token)
			{
				Post.find({}, function(err, docs){
					if(err){ console.log(err);}
					var filtered = docs.filter(function(doc) {
						return (person.seen.indexOf(doc._id) === -1);
					});
					if(filtered.length != 0)
					{
						User.findById(filtered[0].userIdx, function(err, poster) {
							if (err)
								res.send(err);
							
							//filtered[0].userIdx = "";
							console.log(filtered);
							console.log(filtered[0]);
							console.log(filtered[0]._id);
							var seenArr = person.seen;
							seenArr.push(filtered[0]._id);
							var output = filtered[0].toObject();
							output.name = poster.name;
							output.age = poster.age;
							output.occupation = poster.occupation;
							output.company = poster.company;
							person.seen = seenArr;
							res.json(output);
							person.save(function(err, posted) {
							if (err)
							{
								res.send(err);
								console.log(err);
							}
							});
						});
					}
					else
					{
						res.json({message: "You have seen all posts"});
					}
				});
				
			}
			else
			{
				res.json({message: "Invalid Token"});
			}
        });
    });
	
	
	router.route('/allMyPosts/:userID/token/:token')
	.get(function(req, res) {
        User.findById(req.params.userID, function(err, person) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
							
            if (err)
                res.send(err);
			if(req.params.token == person.token)
			{
				Post.find({}, function(err, docs){
					if(err){ console.log(err);}
					var filtered = docs.filter(function(doc) {
						return (person.posts.indexOf(doc._id) != -1);
					});
					if(filtered.length != 0)
					{
						res.send(filtered);
						
					}
					else
					{
						res.json({message: "You have no posts"});
					}
				});
				
			}
			else
			{
				res.json({message: "Invalid Token"});
			}
        });
    });
	
router.route('/matches/:userID/token/:token/post/:post')
	.get(function(req, res) {
        User.findById(req.params.userID, function(err, person) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
							
            if (err)
                res.send(err);
			if(req.params.token == person.token)
			{
				Post.findById(req.params.post, function(err, docs){
					if(err){ console.log(err);}
					
					if(docs.userIdx == req.params.userID)
					{
						res.send(docs.interest);
					}
					else
					{
						res.json({message: "You have no matches yet"});
					}
				});
				
			}
			else
			{
				res.json({message: "Invalid Token"});
			}
        });
    });
	
	router.route('/deleteMyPost/:userID/token/:token/post/:post')
	.get(function(req, res) {
        User.findById(req.params.userID, function(err, person) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
							
            if (err)
                res.send(err);
			if(req.params.token == person.token)
			{
				var posts = person.posts;
				var index = posts.indexOf(req.params.post);
				posts.splice(index, 1);
				person.posts = posts;
				person.save(function(err) {
				if (err)
				{
					res.send(err);
					console.log(err);
				}});
				Post.remove({
					_id: req.params.post
				}, function(err, post) {
					if (err)
						res.send(err);
					console.log("Deleted" + post._id);
					res.json({ message: 'Successfully deleted' });
				});
				
			}
			else
			{
				res.json({message: "Invalid Token"});
			}
        });
    });


router.route('/myProfile')
	
    // edit user profile (accessed at POST http://localhost:8080/api/myProfile)
    .post(function(req, res) {
        var user = new User();      // create a new instance of the User model
        user.userID = req.body.userID;  // set the userID (comes from the request)
		user.token = req.body.token;  // set the token (comes from the request)
		var name = req.body.name;
		var age = req.body.age;
		var occupation = req.body.occupation;
		var company = req.body.company;
		console.log(req.body);
		console.log(user.userID + " " + user.token );
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		User.findOne({ 'userID': user.userID }, 'userID token', function (err, person) {
			
		if (err){
			
			console.log(err);
			return
		}
		if(person == null)
		{		
			
			res.json({ message: 'User not found' , stat: '0', userID: user.userID, token: user.token});
			console.log("User not found");
		}
		else if(user.userID == person.userID && user.token == person.token) 
		{
			res.json({ message: 'Authenticated', stat: '1', userID: user.userID, token: user.token });
			person.name = name;
			person.age = age;
			person.occupation = occupation;
			person.company = company;
			person.save(function(err) {
				if (err)
				{
					res.send(err);
					console.log(err);
			}});
		}
		else if (user.userID == person.userID)
		{
			console.log("Incorrect token");
			res.json({ message: 'Incorrect Token' , stat: '0'});
		}
		
		//console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
		});
        
    })

	

router.route('/login')
	
    // create a user or login (accessed at POST http://localhost:8080/api/login)
    .post(function(req, res) {
        var user = new User();      // create a new instance of the User model
        user.userID = req.body.userID;  // set the userID (comes from the request)
		user.pass = req.body.pass;  // set the userID (comes from the request)
		user.token = Date.now().toString() + user.userID;
		console.log(req.body);
		console.log(user.userID + " " + user.pass + " " + user.token );
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		User.findOne({ 'userID': user.userID }, 'userID pass', function (err, person) {
			
		if (err){
			
			console.log(err);
			return
		}
		console.log("hit0");
		if(person == null)
		{		
			// save the user and check for errors
			user.save(function(err, person) {
				if (err)
				{
					res.send(err);
					console.log(err);
				}

				res.json({ message: 'User created!' , stat: '1', userID: user.userID, token: user.token, indx: person._id});
				console.log("User created!");
			});	
		}
		else if(user.userID == person.userID && user.pass == person.pass) 
		{
			
			console.log("hita");
			res.json({ message: 'Logged In', stat: '1', userID: user.userID, token: user.token, indx: person._id });
			person.token = user.token;
			person.save(function(err) {
				if (err)
				{
					res.send(err);
					console.log(err);
			}});
		}
		else if (user.userID == person.userID)
		{
			console.log("hitb");
			console.log("Incorrect Password");
			res.json({ message: 'Incorrect Password' , stat: '0'});
		}
		
		//console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
		});
        
    })
	
	    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });
	


// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    })
	
	    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });
	
	// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
	
	// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
	// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
	
	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);