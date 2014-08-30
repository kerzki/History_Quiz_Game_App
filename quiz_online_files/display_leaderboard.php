<?php
	include("config.php");
	
	$query = "SELECT * from tbl_score order by score_score DESC LIMIT 10";//query to select top 10
	$result = mysqli_query($conn,$query) or die (mysqli_error($conn));
	
	$return = array();
	while($row = mysqli_fetch_array($result))
	{
	   $return[] = array(
		  'score_id' => $row[0],
		  'user_id' => $row[1],
		  'user_username' => $row[2],
		  'score_score' => $row[3],
	   );
	}
	
	echo json_encode($return);
?>