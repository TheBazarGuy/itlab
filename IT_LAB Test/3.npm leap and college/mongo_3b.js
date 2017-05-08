var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var expressValidator=require('express-validator');
app.use(expressValidator());

// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/College", function(err, db) 
{
 	if(!err) 
	{
    	console.log("We are connected");

	app.get('/', function (req, res) 
              {  
   		console.log("Got a GET request for the homepage");  
   		res.send('<h1>Welcome to College Database</h1>');  
	})
  	app.get('/index3b.html', function (req, res) 
	{  
   		res.sendFile( __dirname + "/" + "index3b.html" );    
})  
	//--------------INSERT------------------------------------------
	app.get('/process_get', function (req, res) 
	{ 	
		
		var USN=req.query.usn;
		var NAME=req.query.name;
		var CGPA=parseInt(req.query.cgpa);
		var newRec = req.query;
		console.log(newRec);
		db.collection('Student').insert({"usn":USN,"name":NAME,"cgpa":CGPA}, function(err, doc) 
		{
    		if (err) 
		{
      			console.log("Failed to create new data.");
    		} 
		else 
		{
		 	res.status(201).json(doc.ops[1]);
    		}
	});
	console.log("Sent data are (GET): USN :"+req.query.usn+" Name :"+req.query.name+" CGPA :"+req.query.cgpa);
	res.send('<p> Record Inserted</p> </br><p>USN : ' + req.query['usn']+'</p><p>Name: '+req.query['name']+'</p><p>CGPA: '+req.query['cgpa']+'</p>'); 
  	}) 
//-------------DISPLAY USING EMBEDDED JS -----------
app.get('/display', function (req, res) 
{ 
db.collection('Student').find().toArray(function(err , i)
	{
        	if (err) 
		return console.log(err)
res.render('disp3b.ejs',{students: i})  
});
}) 
//--------------SEARCH--FOR--STUDENTS--WHOSE--CGPA<9----------------------
app.get("/search", function(req, res) 
{


db.collection('Student').find({cgpa:{$lt:9}}).toArray(function(err, docs) 
	{
    	if (err) 
{
      	console.log(err.message+ "Failed to get data.");
    	} 
	else 
{
      	res.status(200).json(docs);
    	}
  	});
  })
									
app.get('/about', function (req, res) 
{  
   console.log("Got a GET request for /about");  
   res.send('Portal for Students');  
})  
 var server = app.listen(5000, function() 
{  
var host = server.address().address  
var port = server.address().port  
console.log("Example app listening at http://%s:%s", host, port)  
})  
}
else
{   
db.close();  
}
});
