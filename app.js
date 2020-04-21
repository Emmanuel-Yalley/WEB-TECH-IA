var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongose = require("mongose");

//mongose connection
mongose.connect("mongodb://localhost/Employeedb");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//mongose schema
var todoSchema = new mongose.Schema ({
    name: String
});

var Todo =  mongose.model("Todo", todoSchema);

//=========== Express Routes Here ==========//
//default route
app.get("/", function(req, res) {
    Todo.find({}, function(err, todoList){
        if(err) console.log(err);
        else {
            res.render("index.ejs", {todoList: todoList});
        }
    })
});

//submit button route
app.post("/new todo", function(req, res) {
    console.log("Item entered");
    var newitem = new Todo({
    name: req.body.item
    })
    Todo.create(newitem, function(err, Todo) {
        if(err) console.log(err)
        else{
            console.log("Insert Item" ="newItem");
        }
    })
    res.redirect("/");
});

//catch other routes
app.get("*", function(req, res) {
    res.send("<h1>Invalid Page</h1>"); 
});

//server listening on port 3000
app.listen(3000, function(){
    console.log("server started on port 3000");
});