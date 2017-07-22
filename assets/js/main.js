$(document).ready(function($) {
	$("#gif-view").hide();
	var apiKey = "dc6zaTOxFJmzC";
	var limit = 24;
	var recent = ["Meme", "Reaction", "FAILS", "Cat"];
	var offset = 0;
	
	function playGif(played) {

		var state = $(this).attr("data-state");
		var animated = $(this).attr("data-animate");
		var still = $(this).attr("data-still");

		if (state === "still") {
			$(this).attr("data-state", "animate");
			$(this).attr("src", animated);
			$(this).removeClass("gifStill")
			$(this).addClass("focus");
			$(this).parent().closest('div').removeClass("gifStill");
		} else {
			$(this).attr("data-state", "still");
			$(this).attr("src", still);
			$(this).removeClass("focus");
			$(this).parent().closest('div').addClass("gifStill");

		}

	}

	function renderButtons() {
		$("#buttons-view").empty();
		$("#buttons-view").prepend("<h2>Recent Searches</h2>")

		for (var i = 0; i < recent.length; i++) {
			var a = $("<button>");
			a.addClass("recentgif");
			a.attr("data-name", recent[i]);
			a.text(recent[i]);
			$("#buttons-view").append(a);
		}
	}

	function gifButton(valueB) {
		$("#gif-view").empty();
		valueB = $(this).attr('data-name').replace(" ", "+");
		console.log(valueB);
		gifSearch(valueB);

	}

	function gifSearch(value) {
		$("#gif-view").hide();
		$("#gif-view").show(200);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + value + "&offset=" + offset + "&api_key=" + apiKey + "&limit=" + limit;

		// var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=" + value;

		console.log(queryURL);
		$.ajax({
				url: queryURL,
				method: "GET"
			})
			.done(function(response) {
				var load = $("<img id='loadgif' class='img-responsive center-block'>");
				load.attr("src", "assets/img/loading.gif");
				$("#loading").append(load);
				var results = response.data;
				console.log(results);
				for (var i = 0; i < results.length; i++) {
					var gifDiv = $("<div class='col-md-4 item gifStill gifImgs'>");
					
					
					var gifStill = results[i].images.fixed_height_still.url;
					console.log(gifStill)

					var gifImg = $("<img class='center-block still'>");
					
					gifImg.attr("data-still", results[i].images.fixed_height_still.url)
					gifImg.attr("data-animate", results[i].images.original.url)
					gifImg.attr("data-state", "still");
					gifImg.attr("src", results[i].images.fixed_height_still.url);
					console.log

					gifDiv.append(gifImg);

					$("#gif-view").hide().prepend(gifDiv);
					
					

				}

				var instruction= $("<h3 id='inst'>");
				instruction.text("Click the image to play the gif, click again to stop")
				$("#gif-view").prepend(instruction)
				setTimeout(wait, 2000);
				function wait(){
					$("#loading").empty();
					$("#gif-view").show(200);
					
					
				}
				

			});
	}
	$(document).on("click", "img.still", playGif);
	$(document).on("click", "button.recentgif", gifButton);

	$("#add-gif").on("click", function(event) {
		event.preventDefault();
		console.log(recent);
		var valueT = $("#gif-input").val().trim();
		console.log(valueT);
		recent.push(valueT);
		renderButtons();
		gifSearch(valueT);

	});

	renderButtons();
});