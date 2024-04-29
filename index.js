import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

var userBlog = {};
var blogList = [];
var isEmpty = true;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

function currentDate() {
    var dt = new Date();
    const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

    var blogDate = dt.getDate() + ' ' + months[dt.getMonth()] + ' ' + dt.getFullYear();
    return blogDate;
}

function Blog(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
}

app.get('/home', (req, res) => {
    res.render("index.ejs", {today: currentDate(), empty: isEmpty, blogs: blogList});
})

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/newBlog', (req, res) => {
    res.render("post.ejs");
})

app.post('/submit', (req, res) => {
    userBlog = new Blog(blogList.length + 1, req.body["pTitle"], req.body["pContent"]);
    blogList.push(userBlog);
    isEmpty = false;
    res.redirect("/home");
})

app.delete('/delete', (req, res) => {
    const blogId = req.body.blogId;
    blogList = blogList.filter(userBlog => userBlog.id != blogId);
    res.redirect("/home");
});

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
})