<?php
/**
 * Created by PhpStorm.
 * User: Geovanni
 * Date: 4/9/2017
 * Time: 9:31 PM
 */
$x = $_REQUEST["function"];
$y = $_REQUEST["id"];
if($x == "getAverageRating"){
    echo getAverageRating($y);
}else if($x == "Rating"){
    $z=$_REQUEST['rating'];
    Rating($y,$z);
}
function Rating($id,$rating){
    $db = 'ratingtable';
    $conn = mysqli_connect('localhost', 'root', '', 'ratingtable');
    if (!$conn) {
        die("ERROR ON THE CONNECTION" . mysqli_error());
    } else {
        echo "Connected successfully\n";
        $result = mysqli_query($conn, "SELECT * FROM `ratings` WHERE id= $id");
        $row = mysqli_fetch_array($result);
        if(!$row){
            echo "NO DATA FOUND\n";
            $total = $row['total']+$rating;
            $count = $row['count']+1;
            $average = $total/$count;
            $insert = mysqli_query($conn, "INSERT INTO `ratings`(`id`, `total`, `average`, `count`) VALUES ($id,$rating,$average,$count)");
        }else{
            echo "VALUE FOUND\n";
            $total = $row['total']+$rating;
            $count = $row['count']+1;
            $average = $total/$count;
            $update = mysqli_query($conn,"UPDATE `ratings` SET `total`= $total,`average`=$average,`count`= $count WHERE `id`=$id");
        }
    }
}
function getAverageRating($id){
    $db = 'ratingtable';
    $conn = mysqli_connect('localhost', 'root', '', 'ratingtable');
    if (!$conn) {
        die("ERROR ON THE CONNECTION" . mysqli_error());
    } else {
        $result = mysqli_query($conn, "SELECT * FROM `ratings` WHERE id= $id");
        $row = mysqli_fetch_array($result);
        if(!$row){
            return (int)0;
        }else{
            return (int)$row['average'];
        }
    }
}


function getCount($id){
    $db = 'ratingtable';
    $conn = mysqli_connect('localhost', 'root', '', 'ratingtable');
    if (!$conn) {
        die("ERROR ON THE CONNECTION" . mysqli_error());
    } else {
        $result = mysqli_query($conn, "SELECT * FROM `ratings` WHERE id= $id");
        $row = mysqli_fetch_array($result);
        if(!$row){
            return (int)0;
        }else{
            return (int)$row['count'];
        }
    }
}
?>