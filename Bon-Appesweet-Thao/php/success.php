<?php
    session_start();

?>

<!DOCTYPE HTML>

<html>
<head>
    <title>BonApp Registration</title>
</head>
<body>
<div class="header">
    <h1>Register</h1>
</div>
     <h1>Registration successful!</h1>
    <div><h4>Welcome <?php echo $_SESSION[ 'username' ]; ?></h4></div>
</body>    
</html>