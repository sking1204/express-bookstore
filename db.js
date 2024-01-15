/** Database config for database. */


// const { Client } = require("pg");
// const {DB_URI} = require("./config");

// let db = new Client({
//   connectionString: DB_URI
// });

// db.connect();


// module.exports = db;

// const { Client } = require("pg");
// const db = new Client({
//   host: process.env.DB_HOST || "localhost",
//   database: process.env.DB_NAME || "books", // Set your database name
// });
// db.connect();
// module.exports = db;





// const { Client } = require("pg");
// const client = new Client({
//   host: "/var/run/postgresql/",
//   database: "books-test",
// });
// client.connect();
// module.exports = client;

const { Client } = require("pg");

let databaseName = "books";  // Default to production database

if (process.env.NODE_ENV && process.env.NODE_ENV === "test") {
  databaseName = "books-test";  // Use test database if NODE_ENV is set to "test"
}

const client = new Client({
  host: "/var/run/postgresql/",
  database: databaseName,
});

client.connect();

module.exports = client;

