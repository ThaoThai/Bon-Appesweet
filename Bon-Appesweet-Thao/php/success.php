<?php
    session_start();
?>


<!DOCTYPE html>
<meta http-equiv="Cache-control" content="no-cache">
<html>
<head>
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://github.com/dbrekalo/fastselect/"/>

<link href='https://fonts.googleapis.com/css?family=Lato:400,300,700,900&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://rawgit.com/dbrekalo/attire/master/dist/css/build.min.css">
<script src="https://rawgit.com/dbrekalo/attire/master/dist/js/build.min.js"></script>

<link rel="stylesheet" href="../dist/fastselect.min.css">
<script src="../dist/fastselect.standalone.js"></script>
<meta charset="ISO-8859-1">
<title>Bon Appèsweet</title>
<script type="text/javascript" src="../javascript/search.js"></script>
<link type="text/css" rel="stylesheet" href="../css/search.css">
<title>Registration successful</title>
</head>
    
   
<body id="body">
    <div class="title">
       <h1> Bon Appèsweet </h1> 
        <a href="main.php" id="rLink" > GO BACK HOME</a>
     </div>

<div class="input-register">
    <img src="https://cdn.iconscout.com/public/images/icon/free/png-512/omlet-egg-frying-pan-breakfast-food-emoj-symbol-3fd7d855fafae2a4-512x512.png" width="200px" height="200px"> 
    <h2 style= "text-align: center; font-family:helvetica; color:white">WELCOME, <?php echo $_SESSION[ 'username' ]; ?>!</h2><br>
    <a href="login.php" style= "text-align: center; font-family:helvetica; color:white; font-size:30px; color:orange;" > SIGN IN</a>
     </div>
</body>    
</html>