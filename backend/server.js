import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const dbUrl = 'mongodb://localhost/curdwithredux';

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongodb.MongoClient.connect(dbUrl,(err,db)=>{
    
    // Get all posts
    app.get('/api/posts',(req,res)=>{
        db.collection('posts').find({}).toArray((err,posts)=>{
            res.send({posts});
        });
    });

    // Create post
    app.post('/api/posts',(req,res)=>{
        const {title, body,name} = req.body;
        if(title !== '' && body !== '' && name !==''){
          db.collection('posts').insert({title, body,name}, (err, result)=>{
              if(err){
                  res.status(500).json({errors:{global:"something went wrong!"}});
              }else{
                  res.json({post: result.ops[0]})
              }
          })

        }else{
          res.end();
        }
    })

    // Update post
    app.put('/api/posts/:_id',(req,res)=>{
        const {name,title, body} = req.body;
        db.collection('posts').findOneAndUpdate(
        {_id: new mongodb.ObjectID(req.params._id)}, 
        { $set: {name,title, body}},
        { returnOriginal:  false },
        (err, post)=>{
            if(err) {
                res.status(500).json({ error: "something went wrong"});
            }
            res.json(post.value)
        })
    })

    // Delete post
    app.delete('/api/posts/:_id',(req,res)=>{
        db.collection('posts').deleteOne(
        {_id: new mongodb.ObjectID(req.params._id)}, 
        (err, post)=>{
            if(err) {
                res.status(500).json({ error: err});
                return;
            }
            res.json({})
        })
    })

    // Get single post
    app.get('/api/posts/:_id',(req,res)=>{
        db.collection('posts').findOne({_id: new mongodb.ObjectID(req.params._id)}, (req, post)=>{
            res.json({post})
        })
    })

    app.listen(5000, ()=>console.log("server is running in port 5000"));
})

   
