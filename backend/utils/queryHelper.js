// utils/queryHelper.js
const generateInsertQuery = (table, columns) => {
  const placeholders = columns.map(() => '?').join(', ');
  return `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
};

const generateSelectQuery = (table, conditions = null) => {
  let query = `SELECT * FROM ${table}`;
  if (conditions) query += ` WHERE ${conditions}`;
  return query;
};

const generateUpdateQuery = (table, columns, condition) => {
  const setClause = columns.map(col => `${col} = ?`).join(', ');
  return `UPDATE ${table} SET ${setClause} WHERE ${condition}`;
};

const generateDeleteQuery = (table, condition) => {
  return `DELETE FROM ${table} WHERE ${condition}`;
};

module.exports = {
  generateInsertQuery,
  generateSelectQuery,
  generateUpdateQuery,
  generateDeleteQuery
};
