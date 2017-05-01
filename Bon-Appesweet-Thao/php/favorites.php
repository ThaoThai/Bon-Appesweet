
<?php
require_once('session.php');
?>

<?php
/**
 * Created by PhpStorm.
 * User: geova
 * Date: 4/24/2017
 * Time: 9:20 AM
 */

function postSavings($id, $personid, $recipeimage,$recipetitle){
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
            $posting =  mysqli_query($conn, "INSERT INTO `favorites`(`recipeid`,`personid`,`image`,`title`) VALUES ($id, $personid,\"$recipeimage\",\"$recipetitle\");");
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
        $posting =  mysqli_query($conn, "SELECT  `recipeid`, `image`,`title` FROM `favorites` where `personid` = $personid");
        $solutions = array();

        while($row = mysqli_fetch_array($posting)) {
            $solutions[] = $row['recipeid'];
            $solutions[] = $row['image'];
            $solutions[] = $row['title'];
        }
        for($i = 0; $i < count($solutions)-2;$i++){
            $id = $solutions[$i];
            $image = $solutions[$i+1];
            $title = $solutions[$i+2];
            echo "
            <a href='recipeinfo.php?$id' target='_blank'><p style='color:white;font-size:20px'>$title</p><img src='$image' width='200px' height='200px' style='margin:10px;'></a>
            ";
        }

    }
}

$function = $_REQUEST['function'];

if($function == "postSavings") {
    $x = $_REQUEST['id'];
    $y = $_REQUEST['recipeid'];
    $z = $_REQUEST['recipeimage'];
    $w = $_REQUEST['recipetitle'];
    postSavings($y,$x,$z,$w);
}else if($function == "getSavings"){
    $x = $_REQUEST['id'];
    getSavings($x);
}
?>