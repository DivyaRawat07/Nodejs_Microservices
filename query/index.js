const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {}

posts === {
    'abcdefg29':{
        id:'abcdefg29',
        title:'post title',
        comments: [
            {id: 'xyz07', content:'comment!'}
        ]
    }
}

app.get('/post',(req,res)=>{
    res.send(posts)
})

app.post('/events',(req,res)=>{
    const {type, data} = req.body

    if(type === 'PostCreated'){
        const{id, title} = data
        post[id] = {id, title, comments:[]}
    }
    if(type === 'CommentCreated'){
        const{id, content, postId} = data

        const post = posts[postId]
        post.comments.push({id, content})
    }
    res.send({})
})

app.listen(4002,()=>{
    console.log('Listening on 4002')
});

