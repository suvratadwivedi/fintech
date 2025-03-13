const TABLE_NAME = 'contact_us';

const FIELDS = {
  id: 'INT AUTO_INCREMENT PRIMARY KEY',
  name: 'VARCHAR(100) NOT NULL',
  email: 'VARCHAR(100) NOT NULL UNIQUE',  // ✅ Enforce unique email
  phone: 'VARCHAR(20) UNIQUE',  // ✅ Enforce unique phone
  subject: 'VARCHAR(255)',
  source: 'VARCHAR(255)',
  message: 'TEXT',
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

module.exports = { TABLE_NAME, FIELDS };
