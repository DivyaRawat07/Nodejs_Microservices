const express = require('express');
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors())
const commentsByPostId = {}

app.get('/post/:id/comments',(req, res)=>{
    res.send(commentsByPostId[req.params.id] || [])
});

app.post('/post/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const{ content } = req.body

    const comments = commentsByPostId[req.param.id] || [];

    comments.push({id: commentId, content, status:'pending'})
    commentsByPostId[req.params.id] = comments

    axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status:'pending'
        }
    })

    res.status(201).send(comments)
})

app.listen(4001,()=>{
    console.log('Listening on 4001');
});
