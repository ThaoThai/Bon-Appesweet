
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
        <a href="registration.php" id="rLink" > SIGN UP</a>
        <a href="login.php" id="rLink"> SIGN IN</a>
        <a href="logout.php" onclick="hideDiv()"> LOG OUT</a>
    </div>
    <div class="input">
        <img src="https://cdn.iconscout.com/public/images/icon/free/png-512/omlet-egg-frying-pan-breakfast-food-emoj-symbol-3fd7d855fafae2a4-512x512.png" width="200px" height="200px"> 
        <h2> <a href="favoritespage.php" ><i><?php 
            echo strtoupper($login_session); ?></i></a> WHAT'S IN YOUR FRIDGE?</h2><br>
        <div id ="select-value"> 
            <div id="cuisin-select"> 
                <h3> Cuisine</h3>
            <select id="cuisine">
                <option> All </option>
                <option> Chinese </option>
                <option> French </option>
                <option> Italian </option>
                <option> Mexican </option>
                <option> American </option>
                <option> Filipino </option>
                <option> Japanese </option>
                <option> Korean </option>
                <option> Malaysian </option>
                
            </select> </div>

            <div id ="time-select">
                 <h3> Prep Time </h3>
            <select id="time">
              <option> All </option>
              <option> Fast </option>
              <option> Medium </option>
              <option> Slow </option>
            </select></div>

            
            <div id="meal-select"> 
                 <h3> Meal Type</h3>
            <select id="meal">
                <option> All </option>
                <option> Side Dish </option>
                <option> Dessert </option>
                <option> Appetizer </option>
                <option> Salad </option>
                <option> Breakfast </option>
                <option> Soup </option>
                <option> Beverage </option>
                <option> Sauce </option>
                <option> Drink </option> 
            </select> </div>
        
        </div>
        
        <br><br>
        
<!--        <input type="text" multiple class="demo" data-url="data.json" name="language">-->
        <input type="text" id="search" multiple class="selectIngd" data-url="../data.json" data-load-once="true" name="ingredients" placeholder="Add Your Ingredients"/><br><br>
<!--
        <script>
                $('.multipleInputDynamicWithInitialValue').fastselect();
        </script>
        <script> $('.selectIngd').fastselect()</script><br><br>
-->
        <button id ="find" onclick="complexSearch()"><img id="fridge" src="https://s3.amazonaws.com/swings/icons/icon_fridge.png"> FIND MY RECIPES</button>
    </div><br>
     <div id="recipes" >
         
    </div>
    
</div>
    
</body>
</html>
