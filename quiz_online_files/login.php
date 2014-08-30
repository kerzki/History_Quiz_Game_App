<?php 


include("config.php");
	
	




//session_start();

$username = $_GET["name"];
$pass = $_GET["pw"];
$allow = "";
$user_id = "";


$query = "SELECT * FROM tbl_user WHERE user_username = '" .$username. "' ";
$result = mysqli_query($conn,$query) or die (mysqli_error($conn));
		
		if ($row = mysqli_fetch_array($result)) {
			$query = "SELECT * FROM tbl_user WHERE user_username = '" .$username. "' AND user_password = '".$pass."'";
			$result = mysqli_query($conn,$query) or die (mysqli_error($conn));
			if ($row = mysqli_fetch_array($result)) {
				$user_id = $row["user_id"];
				$allow = "yes";
			//	$_SESSION["user_nickname"] = $row["user_nickname"];
			//	$_SESSION["user_id"] = $row["user_id"];
			}
					
			else{
				//wrong password
				$allow = "maybe";
				}
		}
		else{
			$allow = "no";

			}
			
	echo $_GET['callback']."(".json_encode(array("username"=>$username,"allow"=>$allow,"user_id"=>$user_id)).");";
?>