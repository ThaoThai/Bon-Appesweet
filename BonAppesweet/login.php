<!DOCTYPE HTML>

<?php
    session_start();

    if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']== true){
        header("Location: mainpage.php");
        
    }
    
    if(isset($_POST['username']) && isset($_POST['password']){
        if($_POST['username'] == $username && $_POST['password'] == $password){
            $_SESSION['logged_in'] = true;
            header("Location: mainpage.php");
        }
    }
   
        
    }
?>

<html>

    <title> BonAppesweet </title>
    <div id = "head">
    <img src = "ingredients.png" width="100%" height="50%" align="middle"/>
    <link rel="stylesheet" type="text/css" href="style.css">
    <p style="text-align: center; font-family:helvetica; font-size:40; color: white"> BonAppesweet </p>
    </div>    

<body>    
    <div id = "frame">
        <p style="text-align: center; font-family:helvetica; color:white">
        User Login
        </p>
        <form method="post" action="index.php">
            <p style= "text-align: left; font-family:helvetica; color:white">
            Username:<br/>
            <input type="text" name="username"><br/>
            Password:<br/>
            <input type="password" name="password"><br/>
            <input type="submit" value="Login">
            </p>   
        </form>
    </div>
</body>
</html>