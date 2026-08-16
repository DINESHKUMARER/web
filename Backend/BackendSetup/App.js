//Backend Rules to Write Code

//Step 1: Importing (to get) All requiredd modules Whatever we want too use in our BAckend application
//express , mongoose , cors , dotenv , bcrypt ,jsonwebtoken etc 

//syntax : require('module-name') method help us to import modules

const express = require('express')

//Step 2: create Express  Application (function)

    const app =  express()

//Step 3:Define route -API indepent
//Api Method of communication - GET , POST , PUT , DELETE

//GET - Get The Data from Server/Backend.
//POST - Send The Data from Server.
//PUT - Update The Exiting Data.
//DELETE - completely delete The Data.

//Syntax - app.methodnmae('Path/Api Address', (req,res)=>{})

//Home BAckend - testing
app.get('/',(req,res)=>{
    res.send('App Running')
})

app.get('/login' , (req,res)=>{
    res.send('Fill The Form To Login/Good Evening User')
})

app.get('/signup' , (req,res)=>{
    res.send('Fill The Signup To Login/Good Evening User')
})

//Step 4: Start The Backend
//Port : Port is Like Address On Internet Which Acts Like Backend Address So That Frontend Can Communicate With Backend Using Port.

// we have Different Free Port Like 3000, 5000 , 8000: we can use any of them  Ports Start our Server.

//syntax: app.listen(portnumber, function-Conformation Message).

app.listen(3000,()=>{
    console.log('Server Running on http://localhost:3000')
})