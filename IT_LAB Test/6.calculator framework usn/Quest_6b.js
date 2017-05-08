var express=require('express');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

var app=express();
var expressValidator=require('express-validator');
app.use(expressValidator());

app.get('/',function(req,res)
{
console.log("Got request for homepage");
res.send("<h1>Welcome</h1>");
})

app.get('/index6b.html',function(req,res)
{
	res.sendFile(__dirname+"/"+"index6b.html");
})

app.post('/process_post',urlencodedParser,function(req,res)
{

	req.checkBody('name','Invalid Name').isAlpha().notEmpty();
	req.checkBody('marks','Invalid Marks').isInt().notEmpty();
	var errors=req.validationErrors();
	if(errors)
	{
		res.send(errors);
		return;
	}
	else
	{
		console.log("No errors");
		console.log("Data Entered are Name:"+req.body.name+" USN :"+req.body.usn+" Branch :"+req.body.branch+" Marks :"+req.body.marks);
	}
})
var server=app.listen(5000,function()
{
var host=server.address().address;
var port=server.address().port;
console.log("Listening at http:// %s %s",host,port);
})