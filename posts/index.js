const express = require('express');
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(cors())
const posts = {}
app.get('/post',(req, res)=>{
    res.send(posts)
});

app.post('/post', async(req,res)=>{
    const id = randomBytes(4).toString('hex')
    const{ title } = req.body

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events',{
        type:'PostCreated',
        data:{
            title,id
        }
    })
    res.send(posts[id])
})

app.listen(8000,()=>{
    console.log('v20')
    console.log('Listening on 8000');
});
