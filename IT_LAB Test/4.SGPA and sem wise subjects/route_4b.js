var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false})

app.get('/',function(req,res)
	    {
		console.log("Got a request for the homepage");
		res.send('<h1>Welcome to CSE Deaprtment</h1>');
	     }
	)

app.get('/index4b.html',function(req,res)
		      {
				res.sendFile(__dirname+"/"+"index4b.html");
		       }
	)

app.get('/third',function(req,res)
		 {
			console.log("Got a request for Third Semester");
			res.send('1.Analog and Digital Design</br>2.Data Structures</br>3.Theory of Computation</br>4.Discrete Mathematics');
		  }
	)
app.get('/fourth',function(req,res)
		 {
			console.log("Got a request for Fourth Semester");
			res.send('1.Design and Analysis of Algorithms</br>2.Computer Organization</br>3.Microprocessors</br>4.Data Communication');
		  }
	)
app.get('/fifth',function(req,res)
		 {
			console.log("Got a request for Fifth Semester");
			res.send('1.Operating Systems</br>2.Computer Networks</br>3.DBMS</br>4.Data Mining');
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