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
			user.save(function(err) {
				if (err)
				{
					res.send(err);
					console.log(err);
				}

				res.json({ message: 'User created!' , stat: '1', userID: user.userID, token: user.token});
				console.log("User created!");
			});	
		}
		else if(user.userID == person.userID && user.pass == person.pass) 
		{
			
			console.log("hita");
			res.json({ message: 'Logged In', stat: '1', userID: user.userID, token: user.token });
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