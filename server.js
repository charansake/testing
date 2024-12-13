const express = require("express");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all requests

// Oracle DB Configuration
const dbConfig = {
  user: "your_username", 
  password: "your_password",
  connectString: "localhost/XE", // Update to your Oracle DB connection string
};

// Sign-Up Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const query = `INSERT INTO users (name, email, password) VALUES (:name, :email, :password)`;

    await connection.execute(query, [name, email, password], { autoCommit: true });
    res.status(201).send("User signed up successfully");
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT * FROM users WHERE email = :email AND password = :password`;

    const result = await connection.execute(query, [email, password]);
    if (result.rows.length > 0) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid email or password");
    }
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
