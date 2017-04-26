<?php
/**
 * Created by PhpStorm.
 * User: geova
 * Date: 4/24/2017
 * Time: 9:20 AM
 */

function postSavings($id, $personid, $recipeimage){
    $conn = mysqli_connect('localhost', 'root', '', 'ratingtable');
    $exist = false;
    if(!$conn){
        die("ERROR CONNECTING" . mysqli_error());
    }else{
        $results = mysqli_query($conn, "SELECT `recipeid` from `favorites` where `personid` = $personid");
        $solutions = array();
        while($row = mysqli_fetch_array($results)) {
            $solutions[] = $row['recipeid'];
        }
        foreach($solutions as $sol){
            if($sol == $id){
                $exist = true;
            }
        }
        if($exist == false){
            $posting =  mysqli_query($conn, "INSERT INTO `favorites`(`recipeid`,`personid`,`image`) VALUES ($id, $personid,\"$recipeimage\")");
            if($posting == 1){
                echo "POSTED SUCCESSFULLY";
            }else{
                echo "ERROR";
            }
        }else{
            echo "RECIPE ALREADY SAVED";
        }
    }
}

function getSavings($personid){
    $conn = mysqli_connect('localhost', 'root', '', 'ratingtable');
    if(!$conn){
        die("ERROR CONNECTING" . mysqli_error());
    }else{
        $posting =  mysqli_query($conn, "SELECT  `recipeid` FROM `favorites` where `personid` = $personid");
        $solutions = array();

        while($row = mysqli_fetch_array($posting)) {
            $solutions[] = $row['recipeid'];
        }
        foreach($solutions as $sol){
            echo $sol;
            echo "<br>";
        }
    }
}

$function = $_REQUEST['function'];

if($function == "postSavings") {
    $x = $_REQUEST['id'];
    $y = $_REQUEST['recipeid'];
    $z = $_REQUEST['recipeimage'];
    postSavings($y,$x,$z);
}else if($function == "getSavings"){
    $x = $_REQUEST['id'];
    getSavings($x);
}
?>