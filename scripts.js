$(document).ready(function(){

	var cards = [
	'<img src="images/monsters-01.png">',
	'<img src="images/monsters-02.png">',
	'<img src="images/monsters-03.png">',
	'<img src="images/monsters-04.png">',
	'<img src="images/monsters-17.png">',
	'<img src="images/monsters-18.png">',
	'<img src="images/monsters-01.png">',
	'<img src="images/monsters-02.png">',
	'<img src="images/monsters-03.png">',
	'<img src="images/monsters-04.png">',
	'<img src="images/monsters-17.png">',
	'<img src="images/monsters-18.png">'
	];
	
	var copyCards = cards.slice();

	var randomCards = [];
	shuffleCards();

	var winMessage = '';

	var gridSize = 12;
	var memoryGameHTML = '';
	var failedMatches = 0;
	

	for (let i = 0; i < gridSize; i++){
		var card = randomCards[i];


		memoryGameHTML += '<div class="card col-sm-3">';
			memoryGameHTML += '<div class="card-holder">';
				memoryGameHTML += `<div class="card-front">${card}</div>`;
				memoryGameHTML += `<div class="card-back"></div>`;
			memoryGameHTML += '</div>';
		memoryGameHTML += '</div>';
	}

	$('.mg-contents').html(memoryGameHTML);

	$('.peek').click(function(){
		$('.card-holder').toggleClass('flip');
		setTimeout(function(){
			$('.card-holder').removeClass('flip');
		}, 1000);
	});

	$('.card-holder').click(function(){
		$(this).toggleClass('flip');

		
		var cardsUp = $('.flip');
		if(cardsUp.length >= 2){
			
			var card1 = cardsUp[0].children[0].children[0].src;
			var card2 = cardsUp[1].children[0].children[0].src;
		
			if (card1 == card2){
				
				cardsUp.removeClass('flip');
				cardsUp.addClass('matched'); 
				var matchedCards = $('.matched');

				$('#Score').html("Matches " + matchedCards.length/2 +"/6");
				if (matchedCards.length == gridSize){
 					setTimeout(function(){
						alert("We beat Team Rocket! Thanks for your help!");
 					},1000);
 				}
					
			}else{
				setTimeout(function(){
					failedMatches += 1;
					$('#teamRocket').html("TEAM ROCKET " + failedMatches + "/4");
					if(failedMatches == 4){
						$('.gameBoard').html("Team Rocket won...</br>You failed! You're no Pokemon Master!");
					}
					cardsUp.removeClass('flip');
				}, 2000);
			
			}
		}	
	});

	function shuffleCards(){
		for(let i = 0; i < cards.length; i++){
			var rand = Math.floor(Math.random() * copyCards.length);
			randomCards.push(copyCards.splice(rand,1)[0]);
		}
	}

	$('.reset').click(function(){
		copyCards = cards.slice();
		randomCards = [];
		shuffleCards();
		
		$('.card-holder').removeClass('flip matched');
	});

});


// if (cardsUp.removeClass('flip')){
// 		failedMatches += 1;
// 		$('#teamRocket').html("TEAM ROCKET " + (failedMatches));
// }

