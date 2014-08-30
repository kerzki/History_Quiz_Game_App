<?php
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "db_quiz";
	
	
	
	$conn = @mysqli_connect ($host,$user,$pass,$db) OR die ('Could not connect to
	MySQL: ' . mysqli_connect_error( ) );
	
	$user_id = $_POST["user_id"];
	$username = $_POST["user_username"];
	$score = $_POST["score"];
	
	$query = "INSERT INTO tbl_score VALUES ('','$user_id','$username','$score')";
	$result = mysqli_query($conn,$query) or die (mysqli_error($conn));
	if($result){
		$return = "success";
	}else{
		$return = "not";
	}
	
	echo ($return);
	
	
?>	