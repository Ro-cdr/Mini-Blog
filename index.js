import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

var userBlog = {};
var blogList = [];
var isEmpty = true;
var editMode = false;
var idCount = 1;
var blogIdAux = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

function currentDate() {
    var dt = new Date();
    const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

    var blogDate = months[dt.getMonth()] + ' ' + dt.getDate()  + ', ' + dt.getFullYear();
    return blogDate;
}

function Blog(id, title, content, date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.publishDate = date;
    this.edited = false;
    this.lastUpdate = '';
}

app.get('/home', (req, res) => {
    if (editMode) editMode = false;
    res.render("index.ejs", {empty: isEmpty, blogs: blogList});
})

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/newBlog', (req, res) => {
    if (editMode) editMode = false;
    res.render("post.ejs", {edit: editMode, title: '', content: ''});
})

app.post('/submit', (req, res) => {   
    if (blogList.length == 0) isEmpty = false;
    userBlog = new Blog(idCount, req.body["pTitle"], req.body["pContent"], currentDate());
    idCount += 1;
    blogList.push(userBlog);
    res.redirect("/home");
})

app.get('/editBlog', (req,res) => {
    editMode = true;
    const id = req.body.blogId;
    blogIdAux = id;
    var blog = blogList.filter(item => { return item.id == id })[0];
    var blogTitle = blog.title;
    var blogContent = blog.content;

    res.render("post.ejs", {edit: editMode, title: blogTitle, content: blogContent});
})

app.put('/edit', (req,res) => {
    editMode = false;
    var title = req.body["pTitle"];
    var content = req.body["pContent"];

    blogList.filter(item => { return item.id == blogIdAux })[0].title = title;
    blogList.filter(item => { return item.id == blogIdAux })[0].content = content;
    blogList.filter(item => { return item.id == blogIdAux })[0].lastUpdate = currentDate();
    blogList.filter(item => { return item.id == blogIdAux })[0].edited = true;

    res.redirect("/home");
})

app.delete('/delete', (req, res) => {
    const blogId = req.body.blogId;
    blogList = blogList.filter(userBlog => userBlog.id != blogId);
    if (blogList.length == 0) isEmpty = true;
    res.redirect("/home");
});

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
})