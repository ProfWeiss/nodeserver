const pool = require('./mysql');

async function initDatabase() {
  // eine Tabelle erzeugen, falls diese noch nicht existiert.
  let query = "CREATE TABLE IF NOT EXISTS cars ( id varchar(36) PRIMARY KEY, name varchar(255) NOT NULL DEFAULT '', type varchar(255) NOT NULL DEFAULT '', fin varchar(100) NOT NULL DEFAULT '', powerKw INTEGER NOT NULL DEFAULT 0, color varchar(20) NOT NULL DEFAULT 'none')";
  try {
    const [rows] = await pool.query(query);
    console.log("success - table operation", rows);
  } catch (error) {
    console.log("error - table operation")
    console.error(error);
  }  
}


initDatabase(); 
console.log("end"); 