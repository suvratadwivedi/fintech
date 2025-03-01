const db = require('./connection');

const createContactUsTable = `
CREATE TABLE IF NOT EXISTS contactus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    source VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(createContactUsTable, (err, result) => {
    if (err) {
        console.error('Error creating contactus table:', err);
        return;
    }
    console.log('contactus table created or already exists');
});

db.end(); 
