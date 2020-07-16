const express = require('express');
const jwt = require('jsonwebtoken');

const app =express();

app.get('/api',(req,res)=>{
    res.json({
        message: "Welcome to the API"
    });   

    
});

app.post('/api/posts',verifyToken, (req,res)=>{
    jwt.verify(req.token,'secretkey',(err, authData)=>{
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            res.json({
                message: "POST API",              
                authData
        }); 
        }   
    });
    
 });

app.post('/api/login',(req,res) => {
    //Mock User
    const user = {
        id:1,
        username: 'saurabh',
        email : 'test@gmail.com'
    }
    jwt.sign({user:user},'secretkey',(err, token) =>{
        res.json({
            token: token
        });
    });
});

//FORMAT OF TOKEN
//Authorization : Bearer <access_token>
//Verify Token
function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];

//check if bearer is undefined
if(typeof bearerHeader !== 'undefined')
{
    //Split at the space
    const bearer = bearerHeader.split('');
    //Get Token from arrya
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    //Next middleware
    next();

}
else
{
    res.sendStatus(403);
}
}
app.listen(3600,() => console.log('Server started on port 3600'));