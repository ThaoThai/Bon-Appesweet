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

<!DOCTYPE HTML>

<html>
<head>
    <title>BonApp Registration</title>
</head>
<body>
<div class="header">
    <h1>Register</h1>
</div>
    
<form method="post" action="registration.php">
    <table>
        <tr>
            <td>Username:</td>
            <td><input type="text" name="username" class="textInput"></td>
        </tr>
        <tr>
            <td>Email:</td>
            <td><input type="email" name="email" class="textInput"></td>
        </tr>        
        <tr>
            <td>Password:</td>
            <td><input type="password" name="password" class="textInput"></td>
        </tr>        
        <tr>
            <td>Password again:</td>
            <td><input type="password" name="password2" class="textInput"></td>
        </tr>        
        <tr>
            <td></td>
            <td><input type="submit" name="register_btn" value="Register"></td>
        </tr>
    </table>
</form>       
</body>    
</html>