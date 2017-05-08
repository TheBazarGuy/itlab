var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/department", function(err, db) 
						 {
 							if(!err) 
							{
    								console.log("We are connected");
								app.get('/', function (req, res) 
									     {  
   											console.log("Got a GET request for the homepage");  
   											res.send('<h1>Welcome to Database for Faculty</h1>');  
									     }
								       )
  								app.get('/index10b.html', function (req, res) 
										         {  
   												res.sendFile( __dirname + "/" + "index10b.html" );    
										         }
								       )  
								//--------------INSERT------------------------------------------
								app.get('/process_get', function (req, res) 
											{ 
												var newRec = req.query;
												console.log(newRec);
												db.collection('Faculty').insert(newRec, function(err, doc) 
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
    
												console.log("Sent data are (GET): ID :"+req.query.id+" Title :"+req.query.title+"  Name :"+req.query.name+" Designation :"+req.query.desig);
												res.send('<p> Record Inserted</p> </br><p>ID : ' + req.query['id']+'</p><p>Title: '+req.query['title']+'</p><p> Name: '+req.query['name']+'</p><p> Designation: '+req.query['desig']+'</p>'); 
  	
											}
									) 

								
							
								//-------------DISPLAY USING EMBEDDED JS -----------
								app.get('/display', function (req, res) 
										    { 
											db.collection('Faculty').find().toArray(function(err , i)
																 {
        																if (err) 
																		return console.log(err)

        																res.render('disp10b.ejs',{faculty: i})  
     																 }
																);

										   }
								       ) 
								//--------------SEARCH--FOR--FACULTY--WITH--DESIGNATION--PROFESSOR--------------------
								

								app.get("/search", function(req, res) 
										   {
											
    											db.collection('Faculty').find({desig: "Professor"}).toArray(function(err, i) 
																             {
    																		if (err) 
																		{
      																			return console.log(err.message+ "Failed to get data.");
    																		} 
																		else 
																		{
      																			res.render('disp10b.ejs',{faculty: i})  
    																		}
  																	     }
																	    );
  										 }
									)
									
								app.get('/about', function (req, res) 
		  								  {  
   											console.log("Got a GET request for /about");  
   											res.send('Portal for Faculty');  
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
