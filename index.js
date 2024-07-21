import express  from 'express';
import methodOverride from 'method-override';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = {};

// Index Route
app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});
  
  // New Route
app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});
  
  // Create Route
app.post('/posts', (req, res) => {
    const id = Date.now().toString();
    posts[id] = req.body;
    res.redirect('/');
});
  
  // Show Route
app.get('/posts/:id', (req, res) => {
    const post = posts[req.params.id];
    res.render('show.ejs', { post, id: req.params.id });
});
  
  // Edit Route
app.get('/posts/:id/edit', (req, res) => {
    const post = posts[req.params.id];
    res.render('edit.ejs', { post, id: req.params.id });
});
  
  // Update Route
app.put('/posts/:id', (req, res) => {
    posts[req.params.id] = req.body;
    res.redirect(`/posts/${req.params.id}`);
});
  
  // Delete Route
app.delete('/posts/:id', (req, res) => {
    delete posts[req.params.id];
    res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});