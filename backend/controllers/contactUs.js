const db = require('../db/connection');

// Submit Contact Form
exports.submitContactForm = (req, res) => {
    const { name, email, phone, subject, source, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, Email, and Message are required' });
    }

    const sql = `INSERT INTO contactus (name, email, phone, subject, source, message) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, email, phone, subject, source, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting contact data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Form submitted successfully', id: result.insertId });
    });
};
