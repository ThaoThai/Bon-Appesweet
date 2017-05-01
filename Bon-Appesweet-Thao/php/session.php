<?php
// Establishing Connection with Server by passing server_name, user_id and password as a parameter
$connection = mysql_connect("localhost", "root", "");
// Selecting Database
$db = mysql_select_db("ratingtable", $connection);
session_start();// Starting Session
// Storing Session
if (($_SESSION['username'])===null) {
    $_SESSION['username'] = "";
}
else {
    $user_check=$_SESSION['username'];
    // SQL Query To Fetch Complete Information Of User
    $ses_sql=mysql_query("select username,user_id from users where username='$user_check'", $connection);
    $row = mysql_fetch_assoc($ses_sql);
    $login_session =$row['username'];
    $_SESSION['user_id']=$row['user_id'];
}
?>