const { pool } = require('../db/migrations/config.js');
const { generateInsertQuery } = require('../utils/queryHelper.js');
const contactUsModel = require('../db/models/contactUsModel.js');
const TABLE_NAME = contactUsModel.TABLE_NAME;
exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, subject, source, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, Email, and Message are required' });
        }

        const query = generateInsertQuery(TABLE_NAME, ['name', 'email', 'phone', 'subject', 'source', 'message']);
        const values = [name, email, phone, subject, source, message];
        
        // const checkQuery = `SELECT * FROM ${TABLE_NAME} WHERE email = ?`;
        // const [existingUser] = pool.execute(checkQuery, [email]);

        // if (existingUser.length > 0) {
        //     return res.status(409).json({ error: 'User already registered with us' });
        // }

        const result = pool.execute(query,values);
        // console.log(result);
        res.status(201).json({ message: 'Form submitted successfully' });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email or phone number already exists' });
        }
        console.error('Error inserting contact data:', err);
        res.status(500).json({ error: 'Database error' });
    }
};
