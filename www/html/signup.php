<?php include("navbar.php");?> 
<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign Up</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <link rel="stylesheet" href="styles/styles.css">
        <link rel="stylesheet" href="styles/contact_us.css">
        <link rel="stylesheet" href="styles/nav.css">

  </head>

<body>
    <div class="hook">
        <h1>Create an Account</h1>
    </div>
    <div class="form-container sign-up">
      <form method="post" action="registration.php">
      <div class="form-group">
            <label for="Username">Username</label>
            <input type="text" name="username" class="form-control" id="name" required>
        </div> 
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" id="email" required placeholder="name@example.com">
          </div>  
          <div class="form-group">
            <label for="Password">Password</label>
            <input type="Password" name="password" class="form-control" id="Password" required>
          </div>
          <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
      </div>
    <form> 
</body>
</html>