var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false})

app.get('/',function(req,res)
	    {
		console.log("Got a request for the homepage");
		res.send('<h1>Welcome to Flipkart</h1>');
	     }
	)

app.get('/index9b.html',function(req,res)
		      {
				res.sendFile(__dirname+"/"+"index9b.html");
		       }
	)

app.get('/electronics',function(req,res)
		 {
			console.log("Got a request for Electronics");
			
			res.send('Electronics products availabe are</br>1.Moto G5 Plus</br>2.Lenovo P2</br>3.Redmi Note 4');
		  }
	)
app.get('/books',function(req,res)
		 {
			console.log("Got a request for Books");
			
			res.send('Books availabe are</br>1.Wings of Fire</br>2.You Can Win</br>3.Who Moved My Cheese');
		  }
	)
app.get('/furniture',function(req,res)
		 {
			console.log("Got a request for Furniture");
			
			res.send('Furniture availabe are</br>1.Royal Oak Coffee Table</br>2.Fab Home Decor Double Sofa</br>3.Spacewood Side Table');
		  }
	)
app.get('/about',function(req,res)
		 {
			console.log("Got a request for about");
			res.send("Flipkart is India's largest online store");
		 }
	)

var server=app.listen(5000,function()
			   {
				var host=server.address().address
				var port=server.address().port
				console.log("Example app listening at http://%s %s",host,port);
			   }
		     )