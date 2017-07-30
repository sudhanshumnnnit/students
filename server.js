var express=require('express');
var app=express();
var mongojs=require('mongojs');
var bodyParser=require('body-parser');

var db=mongojs('contactlist',['contactlist']);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/',function(req,res){
	res.send('hello');
});

app.get('/contactList',function(req,res){
	console.log('i receved fet req');

	db.contactlist.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
	});
	//var contactList=[person1,person2,person3];
	
});

app.post('/contactList',function(req,res){
	console.log(req.body);
	
	db.contactlist.insert(req.body,function(err,docs){
		if(!err){
			console.log('data inserted into db successfully');
			res.json(req.body);
		}
	});
});

app.delete('/contactList/:id',function(req,res){

	var id=req.params.id;

	console.log('id=',id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,docs){
		if(!err){
			res.json(docs);
		}
	});

});

app.get('/contactList/:id',function(req,res){
	var id=req.params.id;
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		if(!err){
			res.json(doc);
		}
	});
});

app.put('/contactList/:id',function(req,res){
	var id=req.params.id;
	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},update:{$set:{name:req.body.name,email:req.body.email,mobNo:req.body.mobNo}},new:true},function(err,doc){
		if(!err){
			res.json(doc);
		}
	});
});
app.listen(9000,function(){
	console.log('Server is running on port 9000');
})