// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body-parser to get data from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      return res.status(500).end();
    }
    res.send(data);
  });
});

// Add comments
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      return res.status(500).end();
    }
    const comments = JSON.parse(data);
    const newComment = req.body;
    newComment.id = comments.length;
    comments.push(newComment);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        return res.status(500).end();
      }
      res.send(newComment);
    });
  });
});

// Start web server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});