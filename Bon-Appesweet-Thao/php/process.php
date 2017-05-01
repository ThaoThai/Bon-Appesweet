<?php
    session_start();
    $error='';
    if (empty($_POST['username']) || empty($_POST['password'])) {
        $error = "Username or Password is invalid";
    } 
else {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $username = stripcslashes($username);
    $password = stripcslashes($password);
    $username = mysql_real_escape_string($username);
    $password = mysql_real_escape_string($password);

    mysql_connect("localhost","root","");
    mysql_select_db("ratingtable");
    
    $result = mysql_query("select * from users where username = '$username'") or die("Failed to query databse".mysql_error());
    
    $row = mysql_fetch_array($result);
    if ($row['username']== $username && $row['password'] == $password) {
        $_SESSION['username']=$username;
        echo "Login success! Welcome ".$row['username'];
        header("location: main.php");
    } else {
        echo "Failed to login!";
    }
}


?>
    


<!--

<?php

    $db = mysqli_connect("localhost", "root", "", "ratingtable");
    session_start();

    if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']== true){
        
        header("Location: welcome.php");
    
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
            $error = "Your Username or Password is invalid";   
        }
    }
?>
-->
