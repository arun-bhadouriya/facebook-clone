const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static("src"))

// handle authentication
// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
const users = [
]
app.post("/login",(req,res) => {
    const username = req.body.username
    const password = req.body.password
    const action = req.body.action
    
    if(action === "login"){
        console.log(username,password,action)
        let found= false
        users.forEach((user)=>{
            if (user.email===username && user.password===password){
                console.log("User Found")
                found = true
                res.redirect("/main")
            }
        })
        if(!found){
            res.send("Invalid user identified . Please try again with valid credentials.")
        }
        // res.send("login")    
    }
    else if (action === "register") {
        console.log("Register route")
        res.redirect("/register")
    }
})
app.get("/main",(req,res)=>{
    res.send("main page unloading .. please wait ")
})

app.post("/register",(req,res)=>{
    console.log(req.body)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const dob = req.body.dob
    const gender = req.body.gender
    if (!firstname || !lastname || !email || !password || !dob || !gender)
        res.send("Please enter a valid value in all the fields.")
    else {
        const user ={...req.body}
        users.push(user)
        console.log(users)
        res.redirect("/")
    }
})

app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/src/register.html")
})

// Server started on the port
app.listen("3000",()=>{
    console.log("https://localhost/3000")
})
