const express= require('express')
const app= express()
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const url= 'mongodb://localhost/blogDb'
const User = require('./models/user');
const Post = require('./models/post');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/user/login', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        User.find({
            username : req.body.username, password : req.body.password
        }, function(err, user){
            if(err) throw err;
            if(user.length === 1){  
                console.log('success')
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }
             
        })
    });
})
app.post('/api/user/register', (req, res) => {
    
    mongoose.connect(url, function(err){
        if(err) throw err;
       User.exists({username: req.body.username}, function(err, result){
           if(err) console.log(err);
           if(result) res.json({status: 'failiure', message: 'exists'})
           else User.create({username: req.body.username, password: req.body.password}, function(err, result){
            console.log(result)   
            if(err) throw err;
               else res.json({status: 'success', data: result})
           })
       })
    });
})

app.get('/api/post/getAllPost', (req, res) => {
	mongoose.connect(url, { useMongoClient: true } , function(err){
		if(err) throw err;
		Post.find({},[], { sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})
app.get('/api/post/getMyPosts', (req, res) => {
    var usernam=req.query.username;
    console.log(usernam)
	mongoose.connect(url, { useMongoClient: true } , function(err){
		if(err) throw err;
		Post.find({author: usernam}, function(err, result){
            if(err) res.send(err);
            else res.json(result);
        })
	});
})
app.get('/api/post/getPost', (req, res) => {
    var id=req.query.id;
	mongoose.connect(url, { useMongoClient: true } , function(err){
		if(err) throw err;
        Post.findById(id, function(err, result){
            if(err)res.send(err);
            else res.json(result);
        })
})
})
app.post('/api/post/createPost', (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function(err){
        if(err) throw err;
        const post = new Post({ 
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            date_created: req.body.date_created
        })
        post.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})
app.post('/api/post/updatePost', (req, res) => {
	mongoose.connect(url, { useMongoClient: true }, function(err){
		if(err) throw err;
		Post.findByIdAndUpdate(
			{_id: req.body.id },
            { title : req.body.title, description: req.body.description },
            {new: true},
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})
app.delete('/api/post/deletePost', (req, res) => {
    var id=req.query.id;
    console.log(req.body);
    mongoose.connect(url, { useMongoClient: true }, function(err){
        if(err) throw err;
        Post.findByIdAndRemove(id,
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
});

app.listen(3000, ()=> console.log('blog running on port 3000'))
