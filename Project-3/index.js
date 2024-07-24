import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', { 
        posts: posts
    });
});

app.post('/posts', (req, res) => {
    const newPost = {
        id: Date.now(), // Unique ID for each post
        title: req.body.title,
        content: req.body.content,
        author: req.body.author, // Add author
        date: new Date().toUTCString() // Store the current date in UTC
    };
    posts.push(newPost); // Add the new post to the array
    res.redirect('/'); // Redirect to the home page after submission
});

// Route to edit a post
app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('edit', { post: post });
    } else {
        res.redirect('/');
    }
});


// Route to update a post
app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
    }
    res.redirect('/');
});

// Route to delete a post
app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId); // Remove the post from the array
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});