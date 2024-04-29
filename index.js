const express = require("express");
let app = express()
let port = 8080;
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:true}));           // its  middlewares for express

app.use(methodOverride('_method'));

app.set("view engine","ejs");                           // to set ejs files
app.set("views",path.join(__dirname,"views"));          // to render ejs files
app.use(express.static(path.join(__dirname,"public"))); // to set css files

let posts = [
    {
        id:uuidv4(),
        username:"affan_asghar",
        says:"I am best coder"
    },
    {
        id:uuidv4(),
        username:"rahul_sen",
        says:"GTA V de dunge"
    },
    {
        id:uuidv4(),
        username:"Vivek_singh",
        says:"i am CR of a class"
    }
]

app.get("/",(req,res)=>{
    res.redirect("/posts");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post  = posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
    // res.send("It's Working");
})

app.post("/posts",(req,res)=>{
    let {username,says} = req.body;
    let id = uuidv4();
    posts.push({ id,username,says});
    res.redirect("/posts");
})

// Patch Request (Update route)

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newSays = req.body.says;
    let post  = posts.find((p)=> id === p.id);
    post.says = newSays;
    console.log(post);
    // res.send("Patch request working");
    res.redirect("/posts");
})

// -- Edit --

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post  = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
})

// --- Delete --- 

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    // res.send("Deleted sucessfully");
    res.redirect("/posts");
});

app.listen(port,(req,res)=>{
    console.log(`App is listenting on port ${port}`);
})