<ul class="nav nav-pills">
    <li class="nav-item">
        <a class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'active' : ''; ?>" href="/index.php">Home</a>
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle <?php echo (strpos($_SERVER['PHP_SELF'], 'about/') !== false) ? 'active' : ''; ?>" href="#" id="aboutDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">About Us</a>
        <div class="dropdown-menu" aria-labelledby="aboutDropdown">
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'about/mohammad-about.php') ? 'active' : ''; ?>" href="/about/mohammad-about.php">Mohammad</a>
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'about/ameer-about.php') ? 'active' : ''; ?>" href="/about/ameer-about.php">Ameer</a>
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'about/amardeep-about.php') ? 'active' : ''; ?>" href="/about/amardeep-about.php">Amardeep</a>
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'about/natalie-about.php') ? 'active' : ''; ?>" href="/about/natalie-about.php">Natalie</a>
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'about/janani-about.php') ? 'active' : ''; ?>" href="/about/janani-about.php">Janani</a>
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'about/nitin-about.php') ? 'active' : ''; ?>" href="/about/nitin-about.php">Nitin</a>
        </div>
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle <?php echo (strpos($_SERVER['PHP_SELF'], 'games/') !== false) ? 'active' : ''; ?>" href="#" id="gamesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Game Engines</a>
        <div class="dropdown-menu" aria-labelledby="gamesDropdown">
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'games/phaser-demo.php') ? 'active' : ''; ?>" href="/games/phaser-demo.php">Phaser</a>
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'games/pixi-demo.php') ? 'active' : ''; ?>" href="/games/pixi-demo.php">Pixi JS</a>
            <a class="dropdown-item <?php echo (basename($_SERVER['PHP_SELF']) == 'games/matter-demo.php') ? 'active' : ''; ?>" href="/games/matter-demo.php">Matter.js</a>
        </div>
    </li>
    <li class="nav-item ml-auto">
        <a class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'contact.php') ? 'active' : ''; ?>" href="/contact.php">Contact Us</a>
    </li>
    <li class="nav-item">
        <a class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'signup.php') ? 'active' : ''; ?>" href="/signup.php">Sign up</a>
    </li>
    <li class="nav-item">
        <a class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'login.php') ? 'active' : ''; ?>" href="/login.php">Log in</a>
    </li>
</ul>
