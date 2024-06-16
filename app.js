const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./database/contact_messages.db');

app.use(express.static(path.join(__dirname, 'public')));  // Serve static files
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/lineup', (req, res) => {
    res.render('lineup');
});

app.get('/stages', (req, res) => {
    res.render('stages');
});

app.get('/faq', (req, res) => {
    res.render('faq');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.run('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/contact');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
