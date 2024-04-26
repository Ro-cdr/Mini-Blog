import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

function currentDate() {
    var dt = new Date();
    const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

    var postDate = dt.getDate() + ' ' + months[dt.getMonth()] + ' ' + dt.getFullYear();
    return postDate;
}

app.get('/', (req, res) => {
    res.render("index.ejs", {today: currentDate()});
})

app.get('/post', (req, res) => {
    res.render("post.ejs");
})

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
})