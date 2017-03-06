

$(document).ready(function(){

	// Array of possible gems //
		var gem = ["agate", "amethyst", "aragonite", "azurite", "celestine", "crystal", "fluorite", "gypsum", "jade", "olivine", "onyx", "quartz", "rhodochrosite", "rose", "unakite"];

	// Set variables for the arrays of game gems and gem values

		var gameGems = [];
		var gemValues = [];
		var gemPick = "";
		var clickValue = "";
		var counter = 0;
		var gameOver = 0;
		var targetScore = 0;
		var gemisSaved = 0;

		var gamesWon = 0;
		var gamesLost = 0;


	// This function shows a faint shadow of the full collection of gems at game start. It uses variable substitution on a jQuery selector for the gem image ID.

		for (var i = 0; i < gem.length; i++) {
		 	$('#' + gem[i]).fadeTo(2000,0.1);
		 } 

	// This function initializes and resets the game

		function initGame () {

		gameGems = [];
		gemValues = [];
		gemPick = "";
		clickValue = "";
		counter = 0;
		gameOver = 0;
		gemisSaved = 0;
		$("#gemImages").html("");
		$("#gameCounter").text(0);
		$("#winlossMessage").text("");

		

		// Generate a random target score between 19 and 120 to start the game //


		targetScore = Math.floor((Math.random() * 101) +19);
		$("#setTarget").text(targetScore);
		console.log(targetScore);



		//Choose four gems randomly from the gem array

		while (gameGems.length < 4) {
			var gemPick = gem[Math.floor(Math.random() * gem.length)];

				// If the gem hasn't already been chosen, then push it into the game gem array

				if (gameGems.indexOf(gemPick) === -1) {
					gameGems.push(gemPick);
				}
				
				console.log(gemPick);
			}

		// Display the game gem images by appending each one into the gem images div. Add a class that allows for a click event 

		for (var i = 0; i < 4; i++) {
		
			var imageUrl = "<img class='gem_image' src='assets/images/" + gameGems[i] + ".png'> ";
			$("#gemImages").append(imageUrl);

			}						 
	

		// Choose a value for each game gem between 1 and 12 

		while (gemValues.length < 4) {
			var clickValue = Math.floor((Math.random() * 12) + 1);

		// Each gem should have a unique value; if the random value generated has not been used, push it into the gem value array

			if (gemValues.indexOf(clickValue) === -1) {
				gemValues.push(clickValue);
			}

		}

		// Set the click event for the gem images on the page

		$(".gem_image").click(gemClicked);

		console.log(gemValues);

		// Button to play again

		$("#playagainbutton").click(initGame);

		// Button to reset the win/loss counter

		$("#resetbutton").click(resetCounter);

	}  // end function initGame


	// Create function - for each click on a gem image, we are looking up the value of that gem, and adding that value to the counter.

	function gemClicked () {

		if (gameOver === 1) {
			return;
		} 

		// Extract the gem name from the source attribute by splitting the file path up into elements of an array. The last element will be the file name.

		var sourceAttribute = $(this).attr("src");
		var gemName = sourceAttribute.split('\\').pop().split('/').pop();

		// Finally, strip off the image file name extension (in this case .png)

		gemName = gemName.slice(0, -4);

		// Using the gem name, look up the position of the gem by querying its array index

		var gemIndex = gameGems.indexOf(gemName);
		

		// Then use the array index to look up the gem click value for that position, which will be used to increment the counter during game play

		var myValue = gemValues[gemIndex];

		// When the player clicks on a gem, the hidden value increments the counter

		counter += myValue;

		// The counter display is then updated

		$("#gameCounter").text(counter);

		// Checks for win (counter equals target score) or loss (counter exceeds target score)

		if (counter === targetScore) {
			$("#winlossMessage").text("You won! Choose a gem for your collection.");
			gamesWon++;
			$("#winlossCounter").html("Wins: " + gamesWon + "&nbsp;&nbsp;Losses: " + gamesLost);
			gameOver = 1;
			$(".gem_image").click(saveGem);
		}

		if (counter > targetScore) {
			$("#winlossMessage").text("Too high - you lost.");
			gamesLost++;
			$("#winlossCounter").html("Wins: " + gamesWon + "&nbsp;&nbsp;Losses: " + gamesLost);
			gameOver = 1;
		}

	} // end function gemClicked


	// Function to save a gem to the My Gem Collection when you win the game

	function saveGem () {

		if (gemisSaved === 1) {
			return;
		}

		//Extract the gem name from the source attribute by splitting the file path up into elements of an array. The last element will be the file name.

		var sourceAttribute = $(this).attr("src");
		var gemSaved = sourceAttribute.split('\\').pop().split('/').pop();

		//Slice the file extension off the gem image file name

		gemSaved = gemSaved.slice(0, -4);

		//The selected gem appears in full color in the My Gem Collection box, by performing variable substitution on the jQuery selector for the gem image ID.

		$("#" + gemSaved).fadeTo(2000, 1.0);

		console.log("gem to save: " + gemSaved);

		//Ensures only one gem can be saved after each win

		gemisSaved = 1;


	} //end of saveGem function


	// Function to reset the win/loss counter to 0 and reinitialize the game

	function resetCounter () {

		gamesWon = 0;
		gamesLost = 0;
		$("#winlossCounter").html("Wins: " + gamesWon + "&nbsp;&nbsp;Losses: " + gamesLost);
		initGame();

	} // end function resetCounter
	   	
initGame();

});
