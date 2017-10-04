const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(session({secret: "somestring"}));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    if (!("count" in req.session)){
        req.session.count = 0;
    }
    req.session.count += 1
    data = {
        count: req.session.count
    }
    res.render("index", data);
})
app.get("/reset", (req, res) =>{
    req.session.destroy();
    res.redirect("/")
})
app.get("/add2", (req, res) =>{
    req.session.count +=1;
    res.redirect("/");
})

app.listen(8000, () => {
    console.log("listening on port 8000");
})