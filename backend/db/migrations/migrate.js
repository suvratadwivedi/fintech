const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const DB_NAME = 'fintech_db';
const MODELS_DIR = path.join(__dirname, '../models');
// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
});
// Function to run migrations
const runMigrations = async () => {
    console.log('🚀 Running Migrations...');

 // Create Database if not exists
 connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
        if (err) {
            console.error('❌ Error creating database:', err.message);
            return;
        }
        console.log(`✅ Database '${DB_NAME}' is ready`);

        // Switch to the new database
        connection.query(`USE ${DB_NAME}`, async (err) => {
            if (err) {
                console.error('❌ Error selecting database:', err.message);
                return;
            }

            // Read all model files
            const modelFiles = fs.readdirSync(MODELS_DIR).filter(file => file.endsWith('.js'));

            for (const file of modelFiles) {
                const model = require(path.join(MODELS_DIR, file));

                if (!model.TABLE_NAME || !model.FIELDS) {
                    console.warn(`⚠️ Skipping '${file}' - TABLE_NAME or FIELDS missing`);
                    continue;
                }

                // Construct the table creation query dynamically
                const fields = Object.entries(model.FIELDS)
                    .map(([field, type]) => `${field} ${type}`)
                    .join(', ');

                const createTableQuery = `CREATE TABLE IF NOT EXISTS ${model.TABLE_NAME} (${fields})`;
                connection.query(createTableQuery, (err) => {
                    if (err) {
                        console.error(`❌ Error creating table '${model.TABLE_NAME}':`, err.message);
                        return;
                    }
                    console.log(`✅ Table '${model.TABLE_NAME}' is ready`);
                });
            }
            console.log('🎉 Migrations completed successfully');
            connection.end(); // Close connection
        });
    });
};
// Execute migrations
runMigrations();
