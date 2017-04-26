<?php
    session_start();

    $db = mysqli_connect("localhost", "root", "", "authentication");
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }
    //echo(isset($_POST['register_btn']));
    if(isset($_POST['register_btn'])){
        echo($_POST['register_btn']);
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $email = mysqli_real_escape_string($db, $_POST['email']);
        $password = mysqli_real_escape_string($db, $_POST['password']);
        $password2 = mysqli_real_escape_string($db, $_POST['password2']);
        
        echo($username);
        echo($email);
        echo($password);
        echo($password2);
        
        if($password == $password2){
            //create user
            $password = md5($password); //hash password before storing
            //$sql = "INSERT INTO `users`(`username`, `email`, `password`) VALUES($username, $email, $password)";
            $result = mysqli_query($db, "INSERT INTO `users`(`username`, `email`, `password`) VALUES(\"$username\", \"$email\", \"$password\")");
            
            if($result == 1){
                $_SESSION['message'] = "You are now logged in";
                $_SESSION['username'] = $username;
                echo($username);
                echo($email);
                echo($password);
                echo($password2);
        
                header("location: success.php"); //redirect to search engine page 
            }else{
                echo ("ERROR");
            }

            
        }
        
        else{
            //failed
            $_SESSION['message'] = "The two passwords do not match";
        }
    }
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
<title>Registration</title>
<script type="text/javascript" src="../javascript/search.js"></script>
<link type="text/css" rel="stylesheet" href="../css/search.css">
</head>

<html>
<head>
    <title>Registration</title>
</head>
<body>
<div class="title">
    <h1>Bon Appèsweet </h1>
    <a href="main.php" id="rLink"> HOME</a>
    <a href="main.php" id="rLink"> SIGN IN</a>
</div>
<div class="input-register">
            <img src="https://cdn.iconscout.com/public/images/icon/free/png-512/omlet-egg-frying-pan-breakfast-food-emoj-symbol-3fd7d855fafae2a4-512x512.png" width="200px" height="200px"> 
        <h2> CREATE YOUR ACCOUNT</h2><br>
<form method="post" action="registration.php">
    <table border="0">
        <tr>
            <td>USERNAME:</td>
            <td><input type="text" name="username" class="textInput"></td>
        </tr>
        <tr>
            <td>EMAIL:</td>
            <td><input type="email" name="email" class="textInput"></td>
        </tr>        
        <tr>
            <td>PASSWORD:</td>
            <td><input type="password" name="password" class="textInput"></td>
        </tr>        
        <tr>
            <td>PASSWORD AGAIN:</td>
            <td><input type="password" name="password2" class="textInput"></td>
        </tr>        
        <tr>
            <td></td>
            <td><button class="registertbn" name="register_btn" value="REGISTER"> REGISTER</button></td>
        </tr>
    </table>
</form>  
    </div>
</body>    
</html>