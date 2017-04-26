<?php

    $db = mysqli_connect("localhost", "root", "", "authentication");
    session_start();

    if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']== true){
        header("Location: main.php");    
    }
    
    if(isset($_POST['username']) && isset($_POST['password'])){
        $myusername = mysqli_real_escape_string($db,$_POST['username']);
        $mypassword = mysqli_real_escape_string($db,$_POST['password']);
        $passwordhash = md5($mypassword); 
        
        
        
        
        
        $sql = "SELECT id FROM users WHERE username = '$myusername' and password = '$passwordhash'";
        
        $result = mysqli_query($db, $sql);
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
        $active = $row['active'];
        
        $count = mysqli_num_rows($result);
        
        if ($count == 1){
            session_register("myusename");
            $_SESSION['login_user'] = $myusername;
            
            header("location: welcome.php");
        }
        
        else{
            $error = "Your Usernam or Password is invalid";   
        }
    }
?>

<!DOCTYPE HTML>

<html>

    <title> BonAppesweet </title>
    <div id = "head">
    <img src = "ingredients.png" width="100%" height="50%" align="middle"/>
    <link rel="stylesheet" type="text/css" href="style.css">
    <p style="text-align: center; font-family:helvetica; font-size:40; color: white"> BonAppesweet </p>
    </div>    

<body>    
    <div id = "frame">
        <p style="text-align: center; font-family:helvetica; color:grey">
        User Login
        </p>
        <form method="post" action="index.php">
            <p style= "text-align: left; font-family:helvetica; color:grey">
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