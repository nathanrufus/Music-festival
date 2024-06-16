const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/contact_messages.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Table created successfully.');
    });
});

db.close();
