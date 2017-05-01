
<?php
include('session.php');
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
</head>
    
    
<body id="body">
 <div id= "wrapper">
    <div class="title">
       <h1> Bon Appèsweet </h1> 
        <a href="main.php" id="rLink" > HOME</a>
        <a href="logout.php" id="rLink"> LOG OUT</a>
    </div>
    <div class="input">
        <h2> <a href="favoritespage.php" style="font-size:40px; color:#57A43C;"><i><?php 
            echo strtoupper($login_session); ?></i></a> FAVORITE</h2><br>
        
<div id="body" style="height: 60%; width: 100%">
    <div id="bodycontainer">
        <div id="show">
            <script>
                var user_id = "<?php echo $_SESSION['user_id']; ?>";
                getSavings(user_id);
            </script>
        </div>
    </div>
</div>
     </div>
    </div>
</body>
</html>