<?php 
include("config.php");
	
/** variables for different data received */
		$email = $_GET["email"];
		$username = $_GET["username"];

		$emailcode = "";
		$usernamecode = "";
/**checks if email exists */
		$query = "SELECT user_email FROM tbl_user WHERE user_email = '" .$email. "'";
		$result = mysqli_query($conn,$query) or die (mysqli_error($conn));
		$row = mysqli_fetch_array($result);
			if ($row > 0) {
				$emailcode = "exists";
							}
			else
				{
				$emailcode = "notexists";
				}
/**checks if username exists */
		$query1 = "SELECT user_email FROM tbl_user WHERE user_username = '" .$username. "'";
		$result1 = mysqli_query($conn,$query1) or die (mysqli_error($conn));
		$row1 = mysqli_fetch_array($result1);
			if ($row1 > 0) {
				$usernamecode = "exists";
							}
			else
				{
				$usernamecode = "notexists";
				}
/** return a callback to the mobile app */
echo $_GET['callback']."(".json_encode(array("email"=>$email,"eexists"=>$emailcode,"username"=>$username,"uexists"=>$usernamecode)).");";
?>