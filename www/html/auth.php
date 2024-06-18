
<?php
// Database credentials
$servername = "localhost";
$username = "team10";
$password = "team10";

try {
    
    // create connection
    $conn = new PDO("mysql:host=$servername;", $username, $password);
    // switch to the db
    $conn->exec("USE users");

   if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"]; // currently unhashed

    // insert
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND password = :password");

    // bind parameters
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);

    $stmt->execute();

    // CURRENTLY route back to homepage, but this needs to change after we implement our game pages
    if ($stmt->rowCount() > 0) {
        header("Location: index.php");
    } else {
        header("Location: login.php?error=1");
    }
}

    // close connection
    $conn = null;
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>
