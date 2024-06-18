const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fs = require('fs');
var https = require('https');
const http = require('http');


const app = express();
const port = process.env.PORT || 8000; // Use environment variable for port or default to 8000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database credentials
const dbConfig = {
  host: process.env.NODE_ENV === 'production' ? 'cis4250w24-10.socs.uoguelph.ca' : 'localhost',
  user: 'team10',
  password: 'team10',
  database: 'users',
};

// Database connection pool
const pool = mysql.createPool(dbConfig);

// Registration route
app.post('/registration', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const connection = await pool.getConnection();

    // Insert user into the database
    const insertUserQuery = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;

    await connection.query(insertUserQuery, [username, email, password]);

    // Generate and store token
    const token = require('crypto').randomBytes(16).toString('hex');
    const updateTokenQuery = `
      UPDATE users
      SET token = ?
      WHERE email = ?
    `;

    await connection.query(updateTokenQuery, [token, email]);

    connection.release();

    res.json({ success: true, token });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// User information route
app.get('/user_info', async (req, res) => {
  try {
    const sentToken = req.get('Authorization').replace('Bearer ', '');

    const connection = await pool.getConnection();

    // Retrieve user information using token
    const getUserQuery = `
      SELECT id, username, email
      FROM users
      WHERE token = ?
    `;

    const [user] = await connection.query(getUserQuery, [sentToken]);

    connection.release();

    if (user.length > 0) {
      res.json({ success: true, user: user[0] });
    } else {
      res.status(401).json({ success: false, error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Save the user-submitted message on the server
app.post('/save_message', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const currentTime = new Date().toLocaleString();
    const fileName = `${name.replace(/ /g, '_').toLowerCase()}_${currentTime.replace(/[/:,\s]/g, '-')}.txt`; // Format: name_current_time.txt

   // Define the base directory path based on NODE_ENV
    const baseDir = process.env.NODE_ENV === 'production' ? 'server/messages' : './messages';

    // Create the messages directory if it doesn't exist
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true }); // Use recursive option to create nested directories if needed
    }

    const filePath = `${baseDir}/${fileName}`;

    // Create the file content
    const fileContent = `Email: ${email}\n\nSubject: ${subject}\n\nMessage: ${message}\n`;

    // Write data to the file
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error('Error saving message to file:', err);
        res.status(500).json({ success: false, error: 'Error saving message' });
      } else {
        console.log('Message saved to file:', filePath);
        res.json({ success: true });
      }
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Error saving message' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length > 0) {
      const response = { success: true, email, token: rows[0].token };
      res.json(response);
    } else {
      const response = { success: false };
      res.status(401).json(response);
    }

    connection.release();
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Token retrieval route
app.get('/get_token', async (req, res) => {
  try {
    const { email } = req.query;

    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT id, username, token FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      const response = { success: true, user: rows[0] };
      res.json(response);
    } else {
      const response = { success: false, error: 'Invalid token' };
      res.status(401).json(response);
    }

    connection.release();
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


// Create game_stats table if it doesn't exist on server startup
const createGameStatsTable = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS game_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        moves INT NOT NULL,
        timer INT NOT NULL,
        theme VARCHAR(255) NOT NULL,
        size INT NOT NULL
      )
    `);
    connection.release();
  } catch (error) {
    console.error('Error creating game_stats table:', error);
  }
};

// Call the function to create the table when the server starts
createGameStatsTable();

// Leaderboard route
app.get('/leaderboard', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Retrieve top 10 users with the lowest moves
    const getLeaderboardQuery = `
      SELECT username, moves, timer, theme, size
      FROM game_stats
      ORDER BY moves ASC
      LIMIT 10
    `;

    console.log("Executing leaderboard query...");
    const [leaderboardData] = await connection.query(getLeaderboardQuery);

    connection.release();

    console.log("Leaderboard data:", leaderboardData);
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Route to store game statistics
app.post('/gamestats', async (req, res) => {
  try {
    const { username, moves, timer, theme, size } = req.body;

    console.log("Received gamestats request:", req.body);

    const connection = await pool.getConnection();

    // Insert game statistics into the database
    const insertGameStatsQuery = `
      INSERT INTO game_stats (username, moves, timer, theme, size)
      VALUES (?, ?, ?, ?, ?)
    `;

    await connection.query(insertGameStatsQuery, [username, moves, timer, theme, size]);

    console.log("Game statistics stored successfully");

    connection.release();

    res.json({ success: true });
  } catch (error) {
    console.error('Error storing game statistics:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


/*
quick way to delete table entries:

curl -X DELETE http://localhost:8000/clear_game_stats
*/
app.delete('/clear_game_stats', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Delete all records from the game_stats table
    await connection.query('DELETE FROM game_stats');

    connection.release();

    console.log("Game stats cleared successfully");
    res.json({ success: true, message: "Game stats cleared successfully" });
  } catch (error) {
    console.error('Error clearing game stats:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

/*
quick way to delete table entries:

curl -X DELETE http://localhost:8000/clear_buzzgame_stats
*/
app.delete('/clear_buzzgame_stats', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Delete all records from the game_stats table
    await connection.query('DELETE FROM buzzgame_stats');

    connection.release();

    console.log("BuzzGame stats cleared successfully");
    res.json({ success: true, message: "Game stats cleared successfully" });
  } catch (error) {
    console.error('Error clearing game stats:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


// Create gamestats table for buzzgame
const createBuzzGameStatsTable = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS buzzgame_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        userPoints INT NOT NULL,
        userRank VARCHAR(255) NOT NULL,
        anagram VARCHAR(255) NOT NULL
      )
    `);
    connection.release();
  } catch (error) {
    console.error('Error creating buzzgame_stats table:', error);
  }
};

// Call the function to create the table when the server starts
createBuzzGameStatsTable();

// Leaderboard route for buzzgame
app.get('/buzzgame_leaderboard', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Retrieve top 10 users with the most correct words
    const getBuzzGameLeaderboardQuery = `
      SELECT username, userPoints, userRank, anagram
      FROM buzzgame_stats
      ORDER BY userPoints DESC
      LIMIT 10
    `;

    const [leaderboardData] = await connection.query(getBuzzGameLeaderboardQuery);

    connection.release();

    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching buzzgame leaderboard data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Route to store buzzgame statistics
app.post('/buzzgame_stats', async (req, res) => {
  try {
    const { username, userPoints, userRank, anagram } = req.body;

    const connection = await pool.getConnection();

    // Insert buzzgame statistics into the database
    const insertBuzzGameStatsQuery = `
      INSERT INTO buzzgame_stats (username, userPoints, userRank, anagram)
      VALUES (?, ?, ?, ?)
    `;

    await connection.query(insertBuzzGameStatsQuery, [username, userPoints, userRank, anagram]);

    connection.release();

    res.json({ success: true });
  } catch (error) {
    console.error('Error storing buzzgame statistics:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Determine if environment is production or local
const isProduction = process.env.NODE_ENV === 'production';

console.log("Node Env = " + process.env.NODE_ENV);

// HTTP server for local development
if (!isProduction) {
  http.createServer(app).listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  // HTTPS server for production
  const httpsOptions = {
    key: fs.readFileSync('/home/sysadmin/certs/privkey.pem'),
    cert: fs.readFileSync('/home/sysadmin/certs/fullchain.pem')
  };

  https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

