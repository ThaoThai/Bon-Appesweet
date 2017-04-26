<?php

   session_start();
?>

<!DOCTYPE HTML>
<html>
   
   <head>
      <title>Welcome </title>
   </head>
   
   <body>
      <h1>Welcome <?php echo $_SESSION[ 'login_user' ]; ?></h1> 
   </body>
   
</html>