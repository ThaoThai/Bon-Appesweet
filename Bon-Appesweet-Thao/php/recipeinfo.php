<?php
include('session.php');
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
    var user_id = <?php echo $_SESSION['user_id']; ?>;    
    localStorage.setItem("user_id",user_id);
    moreinfo();
</script>

 </div>

</body>
</html>
    