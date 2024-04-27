import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var userBlog = {};
var blogList = [];
var isEmpty = true;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

function currentDate() {
    var dt = new Date();
    const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

    var postDate = dt.getDate() + ' ' + months[dt.getMonth()] + ' ' + dt.getFullYear();
    return postDate;
}

function Blog(title, content) {
    this.title = title;
    this.content = content;
}

app.get('/', (req, res) => {
    res.render("index.ejs", {today: currentDate(), empty: isEmpty, blogs: blogList});
})

app.get('/post', (req, res) => {
    res.render("post.ejs");
})

app.post('/submit', (req, res) => {
    userBlog = new Blog(req.body["pTitle"], req.body["pContent"]);
    blogList.push(userBlog);
    isEmpty = false;
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
})