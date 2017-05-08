var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false})

app.get('/',function(req,res)
	    {
		console.log("Got a request for the homepage");
		res.send('<h1>Welcome to MSRIT</h1>');
	     }
	)

app.get('/index8b.html',function(req,res)
		      {
				res.sendFile(__dirname+"/"+"index8b.html");
		       }
	)

app.get('/process_get',function(req,res)
		       {
				console.log("Sent data are (GET):Name: "+req.query.name+" Branch: "+req.query.branch +" Semester: "+req.query.semester);
				res.send('<b>Name: '+req.query['name']+'</b></p><p><u> Branch: '+req.query['branch']+'</u></p><p>Semester: '+req.query['semester']+'</p>');
		       }
	)

app.post('/process_post',urlencodedParser,function(req,res)
					  {
						console.log("Sent data are (POST):Name: "+req.body.name+" Branch: "+req.body.branch+" Semester: "+req.body.semester);
						res.send('<p><b>Name: '+req.body.name+'</b></p><p><u> Branch: '+req.body.branch+'</u></p><p>Semester: '+req.body.semester+'</p>');
					  }
	)

app.get('/about',function(req,res)
		 {
			console.log("Got a request for about");
			res.send('MSRIT Dept of CSE');
		  }
	)

var server=app.listen(5000,function()
			   {
				var host=server.address().address
				var port=server.address().port
				console.log("Example app listening at http://%s %s",host,port);
			   }
		     )