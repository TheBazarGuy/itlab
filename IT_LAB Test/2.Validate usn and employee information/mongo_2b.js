var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/employeedb", function(err, db) 
						 {
 							if(!err) 
							{
    								console.log("We are connected");
								app.get('/', function (req, res) 
									     {  
   											console.log("Got a GET request for the homepage");  
   											res.send('<h1>Welcome to Employee Portal</h1>');  
									     }
								       )
  								app.get('/index2b.html', function (req, res) 
										         {  
   												res.sendFile( __dirname + "/" + "index2b.html" );    
										         }
								       )  
								//--------------INSERT------------------------------------------
								app.get('/process_get', function (req, res) 
											{ 
												var newEmp = req.query;
												console.log(newEmp);
												db.collection('employee').insert(newEmp, function(err, doc) 
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
    
												console.log("Sent data are (GET): Employee Name :"+req.query.empname+" Employee Code :"+req.query.empcode+" Department :"+req.query.dept+" Salary :"+req.query.sal);
												res.send('<p> Employee Inserted</p> </br><p>Employee Name : ' + req.query['empname']+'</p><p>Employee Code: '+req.query['empcode']+'</p><p>Department: '+req.query['dept']+'</p><p>Salary: '+req.query['sal']+'</p>'); 
  	
											}
									) 

								//--------------UPDATE------------------------------------------
								app.get('/update2b.html', function (req, res) 
												 {
    													res.sendFile( __dirname + "/" + "update2b.html" );
												 }
								       )

								app.get("/update", function(req, res) 
										   {
											var empname1=req.query.empname;
											var sal1=req.query.sal;
    											db.collection('employee', function (err, data) 
														  {
        														data.update({"empname":empname1},{$set:{"sal":sal1}},{multi:true},function(err, result)
																							  {
																								if (err) 
																								{
																									console.log("Failed to update data.");
																								} 
																								else 
																								{
																									res.send(result);
																									console.log(result.nModified)
																									if (result.nModified)
																									{
				   																						console.log('Document Updated Successfully');
																									}
																									else
																									{
																										console.log('Document not Updated Successfully');
					
																									}
																								}
        																						  }
																  );
    														}
													);
										  }
									)	

							
								//-------------DISPLAY USING EMBEDDED JS -----------
								app.get('/display', function (req, res) 
										    { 
											db.collection('employee').find().toArray(function(err , i)
																 {
        																if (err) 
																		return console.log(err)

        																res.render('disp2b.ejs',{employees: i})  
     																 }
																);

										   }
								       ) 
								app.get('/about', function (req, res) 
		  								  {  
   											console.log("Got a GET request for /about");  
   											res.send('Portal for Employees');  
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
