const express = require('express');
// const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch data from JSONPlaceholder API
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        res.render('data', { posts: data });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).send('Error fetching post data');
    }
});

// Route to handle button click and display post details
app.get('/details/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const postDetails = await response.json();

        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await commentsResponse.json();

        res.render('details', { postDetails, comments });
    } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).send('Error fetching post details');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
