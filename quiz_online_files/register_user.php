<?php
	include("config.php");
	
	
	
	
	
	$username = $_GET["username"];
	$email = $_GET["email"];
	$password = $_GET["password"];
	
	$query="INSERT INTO tbl_user (user_username,user_email,user_password) VALUES('".$username."','".$email."','".$password."')";
	mysqli_query($conn,$query) or die (mysqli_error($conn));
	/** bypass account verification for the meantime */

	/** return a callback to the mobile app */
	echo $_GET['callback']."(".json_encode(array("email"=>$email)).");";
	
?>