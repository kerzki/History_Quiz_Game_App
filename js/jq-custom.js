	/* ---------------------- mga kelangan  na variable START --------------------------------------------------------------------*/
	
	var x = 0;//eto ung index na laging tatanggaling sa questionsArray[] , 0 kase laging unang index lang tatanggalen nten;
			var localStorageUsername = window.localStorage.getItem("username");//for checking if already login
			var localQuizArrayName = "quizGeneric";// iba dapat kada game para sa function na storeQuizArrayToLocalStorage
	
	/* ---------------------- mga kelangan  na variable END --------------------------------------------------------------------*/

	/* onload FUNCTIONS START */

	
	
	
	var myRsgTimer = "";
	
	var myTimer= "";  
	
	var m=5;
	
	var rsg =3;
	//start();
	function start(){
		m = 15;
		
		$("#gameTimer").val(m);
		clearTimeout(myTimer);
		clearInterval(myTimer);
		
		setTimeout(function(){
		myTimer = setInterval(function(){myTimer1()},1000);
		});
	}
	
	function myTimer1(){
		setTimeout(function(){
			$("#gameTimer").val(m);
		});
		m--;
		
		
		
		if(m==0){
		clearTimeout(myTimer);
		clearTimeout(myTimer);
		gameOver();
		}
	}
	
	//timer END
	
	function startRsg(){
		$("#rsgTimer").html("Link!");
		
		
		clearTimeout(myRsgTimer);
		clearInterval(myRsgTimer);
		setTimeout(function(){
		myRsgTimer = setInterval(function(){myRsgTimer1()},700);
		});
	}
	
	function myRsgTimer1(){
	
		setTimeout(function(){
		
		});
		rsg--;
		
		if(rsg == 3){
			$("#rsgTimer").html("Link!");
		
		}
		if(rsg == 2){
			$("#rsgTimer").html("in!");
		}
		if(rsg == 1){
			$("#rsgTimer").html("Start!");
		}
		
		
		
		if(rsg==0){
		clearTimeout(myRsgTimer);
		clearTimeout(myRsgTimer);
		$("#rsgTimerModal").hide();
		gameStart();
		}
	}

	
	
	//timer END
	/* onload FUNCTIONS END */
	
	/*---------------------------------- navigation btn and functions START -------------------------------------------*/
	$("#stopTime").click(function(){
		start();
	});
	
	
	
	
	
	
	
	$("#btn-play").click(function(){
		savePreviousScore();
		setTimeout(function(){
			 $modal.load('main_game_page.html', '', function(){
			 $modal.modal();
			});
		  },10); 

	});
	
	$("#btn-about").click(function(){
		setTimeout(function(){
			 $modal.load('about.html', '', function(){
			 $modal.modal();
			});
		  },10); 
	});
	
	$(".btn-main-menu").click(function(){
		location.href = "index.html";	
	});
	
	$("#btn-leaderboard").click(function(){
		//location.href = "leaderboard_page.html";
		/* modal START */
		setTimeout(function(){
			 $modal.load('leaderboard_page.html', '', function(){
			 $modal.modal();
			});
		  },10); 
		/* modal END */
		
	});
	
	$(".btn-login").click(function(){
		localStorageUsername = window.localStorage.getItem("username");
		//alert(localStorageUsername);
		if(localStorageUsername == "" || localStorageUsername == "null" || localStorageUsername == "undefined" ||localStorageUsername == null ){
			//location.href = "login_page.html";
			/* modal START*/
			//var $modal = $(".index_modal_container");
			  setTimeout(function(){
				 $modal.load('login_page.html', '', function(){
				 $modal.modal();
				});
			  },10); 
			
			/* modal END*/
			
			
		}else{
			logout();
		}
		
	});
	
	$("#btn-register").click(function(){
		//location.href = "registration_page.html"
		
		 setTimeout(function(){
				 $modal.load('registration_page.html', '', function(){
				  $modal.modal();
				});
			  },10); 
	});
	$("#btn-post-score-online").click(function(){
		postScoreOnline();
	});
	
	$("#btn-play-again").click(function(){
		savePreviousScore();
		location.href = "main_game_page.html";
	});
	

	
	$(".btn-choice").click(function(){
			
			
			//check answer START
			var answer = $(this).val();
			var correctAnswer = $("#correct").val();
			if(answer == correctAnswer){
				addScore();
				getQuestion();
			}else{
				gameOver();

			}
			//check answer END
		
	
		
	});//onclick btn-choice END
	/*---------------------------------- navigation btn and functions END -------------------------------------------*/

	


	
	
	/* -------------------------------------- functions START --------------------------------------------------------------------*/
	//for index.html onload
	function splashScreenIntro(){
		var a = sessionStorage.getItem("splash_start");
		if(a == null || a == "" || a == "null" || a == "undefined"){
			setTimeout(function(){
				$(".splashImg").fadeToggle();
					setTimeout(function(){
						$("#splashScreen").fadeToggle();
						sessionStorage.setItem("splash_start",1);
					});
				
			},3000);//1000 for 1 sec
		}else{
			$("#splashScreen").css({"height":"0"});
			$(".splashImg").css({"height":"0"});
			$(".splashImgLogo").css({"height":"0"});
						
		
		}
		
	}
	//for index.html onload
	function checkIfLogin(){
		if(localStorageUsername == "" || localStorageUsername == null){
			$("#btn-login").val("LOGIN");
			$("#btn-register").show();
		}else{
			$("#txt-username").text("Welcome \n"+localStorageUsername);
			$("#btn-login").val("LOGOUT");
			$("#btn-register").hide();
		}
		
	}
	function logout(){
		if(localStorageUsername == "" || localStorageUsername == null){
			location.href = "index.html";
		}else{
			//if already login ,clear localstorage and change btn-login value
			//logout functions means clearing localstorage 
			window.localStorage.setItem("user_id","");
			window.localStorage.setItem("username","");
			$("#txt-username").text("");
			$("#btn-login").val("LOGIN");
			
			
		}
	}
	
	//for leaderboard_page.html onload
	function getLeaderboard(){
		
		var rank = 0;
		$.ajax({
			url: "quiz_online_files/display_leaderboard.php",
			type: "GET",
			dataType: "json",
			success: function(data){
				$(".leaderboardRow").remove();
				for(var i=0;i<data.length;i++){
					rank++
					
					$('#leaderboardTable').append(
					'<tr class="leaderboardRow"><td>'+ rank + '</td><td>'+data[i].user_username+ '</td><td>'+data[i].score_score+'</td> </tr>'
					
					);
				}
			},
			error: function(){
				//do something if error
			}
			
		});
	}
	
	//activate when #btn-post-score-online .click 
	function postScoreOnline(){		
		//check if user is login
		//check in local storage if user_username and user_id is stored
		
		var a = window.localStorage.getItem("user_id");
		var b = window.localStorage.getItem("username");
		var c = window.localStorage.getItem("local-storage-game-over-score");
		
		if(a == null || a == ""){
			$("#game_over_page_msg").html("<i>You must need to <a class='btn-login' href='#stack2' data-toggle='modal'>login</a></i>");
			//alert("You should login to post online");
			//location.href = "login_page.html";
		}else if(a == "no internet connection"){
			//alert("No internet connection");
			$("#game_over_page_msg").html("No internet connection");
		}else {
			//check if have internet
			$.ajax({
				url: "quiz_online_files/post_score_online.php",
				type: "POST",
				data: {"user_id":a,"user_username":b,"score":c},
				success: function(data){
					if(data=="not"){
						//alert("Failed");
						$("#game_over_page_msg").html("Failed");
					}else if(data=="success"){
						//alert("Ok na!. na POST NA BOOOOOOOOOOOOOOOM!");
						$("#game_over_page_msg").html("Your Score was posted online");
						
						
					}
					else{
						$("#game_over_page_msg").html("Your Score was posted online");
						//alert(data);
					}
				}
				
			});
		}
	}
	
	//for index.html onload
	function storeQuizArrayToLocalStorage(){
		var db = window.localStorage.getItem(localQuizArrayName);
		if(db == null || db == ""){
			window.localStorage.setItem(localQuizArrayName,JSON.stringify(quizArray));// quizArray naka include sa taas sa <script></script>
		}
		else{
			//alert("db  " + localQuizArrayName + "  already exist!");
		}
		
		
	}
	
	
	//for main_game_page.html under the function gameStart()
	function getQuestionsIndexes(){
		setTimeout(function(){
			var questionsIndexes = [];	
		
			var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
			
				for(i=0;i < quizArray.length;i++){
					questionsIndexes.push(i);
				}
				
			var	randomizeIndexes = [];//eto ung array na paglalagyan ng mararandom na mga questionsIndexes
			var	i = questionsIndexes.length;
			var	j = 0;

			while (i--) {
				j = Math.floor(Math.random() * (i+1));
				randomizeIndexes.push(questionsIndexes[j]);
				questionsIndexes.splice(j,1);
			}
			
			questionsArray = randomizeIndexes; // naka random na ung indexes ng mga questions naten
			$("#testArray").val(questionsArray);
			getQuestion();
				
				
	
		
			
		
		},50);
	};
	
	//for main_game_page.html activate on page onload and on next question
	function getQuestion(){
	
		if(questionsArray == ""){
			gameOver();
		}else{
			var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
			start();
					var get = questionsArray[0];
					var question = quizArray[get].question;
					var choice1 = quizArray[get].choice1;
					var choice2 = quizArray[get].choice2;
					var choice3 = quizArray[get].choice3;
					var choice4 = quizArray[get].choice4;
					var correct = quizArray[get].correct;
					
					$("#question").val(question);
					$("#choice1").val(choice1);
					$("#choice2").val(choice2);
					$("#choice3").val(choice3);
					$("#choice4").val(choice4);
					$("#correct").val(correct);
					
					
					var removed = questionsArray.splice(x,1);
					$("#testArray").val(questionsArray);	
		}			
	};
	
	//for main_game_page.html onload
	function gameStart(){
		reset();
		getQuestionsIndexes();
		
	};
	
	//for main_game_page.html onload , activate if answer is correct
	function addScore(){
		var a = parseInt($("#score").val()) + 1;
		$("#score").val(a);
	}
	
	//for main_game_page.html onload, activate on gameStart()
	function reset(){
		var score = 0; //player's SCORE
	
		$("#score").val(score);
		
	};
	
	//for main_game_page.html activate on Wrong Answer
	function gameOver(){
		
		var gameOverScore = $("#score").val();
		var previousScore = window.localStorage.getItem("local-storage-previous-score");
		
		saveGameOverScoreOnLocalStorage();//save game over score to local storage
		
		/* stop timer*/
		clearTimeout(myTimer);
		clearInterval(myTimer);
		
		clearTimeout(myRsgTimer);
		clearInterval(myRsgTimer);
		
		
		/* stop timer*/
		
		
		/* modal START*/
			var $modal = $('#main_game_modal_container');
			  setTimeout(function(){
				 $modal.load('game_over_page.html', '', function(){
				  $modal.modal();
				});
			  },1); 
			
			/* modal END*/
		

		var ggScore = window.localStorage.getItem("local-storage-game-over-score");
		$("#txt-game-over-score").val(ggScore);
		$("#txt-previous-score").val(previousScore);
		
		
	};
	
	//function for game_over_page.html onload
	function displayGameOverScoreAndPreviousScore(){
		var localGameOverScore = window.localStorage.getItem("local-storage-game-over-score");
		var localPreviousScore = window.localStorage.getItem("local-storage-previous-score");
		
		if(localPreviousScore == "null" || localPreviousScore == "" || localPreviousScore == "undefined"){
			localPreviousScore = 0;
		}
		$("#txt-game-over-score").val(localGameOverScore);
		$("#txt-previous-score").val(localPreviousScore);
	}
	
	//function for game_over_page.html onload
	function timerStart(){
	
		
	}
	
	
	function getPreviousScore(){
		var previouScore = window.localStorage.getItem("local-storage-previous-score");
		 
	}
	//function for main_game_page.html onload
	function saveGameOverScoreOnLocalStorage(){
		var gameOverScore = $("#score").val();
		window.localStorage.setItem("local-storage-game-over-score", gameOverScore);
	}
	
	//function for main_game_page.html onload
	function savePreviousScore(){
		
		var gamePreviousScore = window.localStorage.getItem("local-storage-game-over-score");
		window.localStorage.setItem("local-storage-previous-score", gamePreviousScore);
			
		
	}

	/* -------------------------------------- functions END --------------------------------------------------------------------*/
		

	
	