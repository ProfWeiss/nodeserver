const path = require('path');
var sqlite3 = require('sqlite3');
const dbPath = path.resolve(__dirname, 'cars.db');
const { uuid } = require('uuidv4');

console.log("__dirname");
console.log(dbPath);

function initDatabase() {
  // eine Tabelle erzeugen, falls diese noch nicht existiert.
  let query = "CREATE TABLE IF NOT EXISTS cars ( id TEXT PRIMARY KEY, name TEXT NOT NULL DEFAULT '', type TEXT NOT NULL DEFAULT '', fin TEXT NOT NULL DEFAULT '', powerKw INTEGER NOT NULL DEFAULT 0)";
  db.run (query);
}

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  initDatabase();
  console.log('Database operation finished.');
});

initDatabase(); 