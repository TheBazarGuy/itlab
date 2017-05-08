var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/cardb", function(err, db) 
						 {
 							if(!err) 
							{
    								console.log("We are connected");
								app.get('/', function (req, res) 
									     {  
   											console.log("Got a GET request for the homepage");  
   											res.send('<h1>Welcome to Car Portal</h1>');  
									     }
								       )
  								app.get('/index1b.html', function (req, res) 
										         {  
   												res.sendFile( __dirname + "/" + "index1b.html" );    
										         }
								       )  
								//--------------INSERT------------------------------------------
								app.get('/process_get', function (req, res) 
											{ 
												var newCar = req.query;
												console.log(newCar);
												db.collection('car').insert(newCar, function(err, doc) 
																    {
    																	if (err) 
																	{
      																		console.log("Failed to create new data.");
    																	} 
																	else 
																	{
		 																res.status(201).json(doc.ops[1]);
    																	}
  																    }
															   );
    
												console.log("Sent data are (GET): Registration No :"+req.query.regno+" Model :"+req.query.model+" Color :"+req.query.color);
												res.send('<p> Car Inserted</p> </br><p>Registration No : ' + req.query['regno']+'</p><p>Model: '+req.query['model']+'</p><p>Color: '+req.query['color']+'</p>'); 
  	
											}
									) 

								//--------------SEARCH------------------------------------------
								app.get('/search1b.html', function (req, res) 
											{  
   												res.sendFile( __dirname + "/" + "search1b.html" );    
											}
									)

								app.get("/search", function(req, res) 
										   {
											var carmodel=req.query.model;
    											db.collection('car').find({model: carmodel}).toArray(function(err, docs) 
																             {
    																		if (err) 
																		{
      																			console.log(err.message+ "Failed to get data.");
    																		} 
																		else 
																		{
      																			res.status(200).json(docs);
    																		}
  																	     }
																	    );
  										 }
									)
									

							
			
								app.get('/about', function (req, res) 
		  								  {  
   											console.log("Got a GET request for /about");  
   											res.send('A portal for cars');  
		  								  }
       								       )  
 
								var server = app.listen(5000, function() 
											      {  
													var host = server.address().address  
  													var port = server.address().port  
													console.log("Example app listening at http://%s:%s", host, port)  
											      }
											)  
							}
							else
							{   
								db.close();  
							}
  
						}
				);
