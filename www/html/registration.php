
<?php
// Database credentials
$servername = "localhost";
$username = "team10";
$password = "team10";

// have to add a way to setup USERS table on start-up -- maybe during install script?

try {
    
    // create connection
    $conn = new PDO("mysql:host=$servername;", $username, $password);

    // **************************************************

    // create the 'users' db
    $conn->exec("CREATE DATABASE IF NOT EXISTS users");

    // switch to the new db
    $conn->exec("USE users");
    
    // create a new table for users
    $createTableQuery = "
      CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
      )
    ";

    $conn->exec($createTableQuery);

    // ************ move above code elsewhere so that the table isnt always created


   if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"]; // currently unhashed
  
    // insert
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");

    // bind parameters
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);

    // CURRENTLY route back to homepage, but this needs to change after we implement our game pages
    if ($stmt->execute()) {
        header("Location: index.php");
    }
}

    // close connection
    $conn = null;
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>
