var sqlite3 = require('sqlite3').verbose();
var dbName = 'hue-steamer-' + process.env.NODE_ENV + '.sqlite';
var db = new sqlite3.Database(dbName);

console.log('Working in database ' + dbName);
console.log('Creating bridges...');
db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS bridges ' +
         '(id INTEGER, user TEXT, ip TEXT, PRIMARY KEY(id ASC))');
});

db.close();
