<?php
include('session.php');
if (($_SESSION['user_id'])===null) { 
    echo "<script>";
    echo "localStorage.setItem(\"user_id\",\"\");";
    echo "</script>";
}
else {
    echo "<script>";
    echo "var user_id = ". $_SESSION['user_id'].";";   
    echo "localStorage.setItem(\"user_id\",user_id);";
    echo "</script>";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../javascript/search.js"></script>
    <link rel="stylesheet" href="../css/info.css">  
</head>
    
<body>
    
<div id="title_head">
       <h1> Bon Appèsweet </h1> 
</div><br><br>
<div id ="wrapper"> 
<script>
    moreinfo();
</script>

 </div>

</body>
</html> 