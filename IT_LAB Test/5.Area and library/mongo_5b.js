var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/library", function(err, db) 
{
 if(!err) 
{
    	console.log("We are connected");
	app.get('/', function (req, res) 
		     {  
   			console.log("Got a GET request for the homepage");  
   			res.send('<h1>Welcome to Library</h1>');  
		     }
)
  	app.get('/index5b.html', function (req, res) 
				{  
   				res.sendFile( __dirname + "/" + "index5b.html" );    
				}
)  
	//--------------INSERT------------------------------------------
	app.get('/process_get', function (req, res) 
			             { 
				var newBook = req.query;
				console.log(newBook);
				db.collection('csebooks').insert(newBook, function(err, doc) 
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
    
console.log("Sent data are (GET): Name  :"+req.query.name+" Title :"+req.query.title+" Author :"+req.query.author+" Year :"+req.query.year);
res.send('<p> Book Inserted</p> </br><p>Name : ' + req.query['name']+'</p><p>Title: '+req.query['title']+'</p><p>Author: '+req.query['author']+'</p><p>Year: '+req.query['year']+'</p>'); 
  	
				}) 
//-------------DISPLAY---------------------
app.get('/display', function (req, res) 
{ 
	db.collection('csebooks').find().toArray(function(err , i)
	{
        	if (err) 
		return console.log(err)
res.render('disp5b.ejs',{books: i})  
     													});
}) 

//--------------SEARCH------------------------------------------
app.get('/search5b.html', function (req, res) 
	{  
   		res.sendFile( __dirname + "/" + "search5b.html" );    
	}
)
app.get("/search", function(req, res)
{
		var booktitle=req.query.title;
    		db.collection('csebooks',{},function(err,books)
					    {
						books.remove({title:booktitle},function(err,result) 
									       {
    										if (err) 
										{
      											console.log(err.message+ "Failed to get data.");
    										} 
										else 
										{
      											console.log(result);
    										}
  										}
							);
  					}
			);
})

									

app.get('/about', function (req, res) 
		 {  
   			console.log("Got a GET request for /about");  
   			res.send('Portal for CSE Books');  
		  }
       	)  
 
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
