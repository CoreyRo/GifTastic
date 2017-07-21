$(document).ready(function($) {




	var recent = ["McCree", "POTG", "Fail", "The Big Lebowski"];
	// var queryURL = "http://api.giphy.com/v1/gifs/search?" + value + "&api_key=dc6zaTOxFJmzC&limit=5";

	function alertgifName(value) {
		value = $(this).attr('data-name').replace(" ", "+");
		console.log(value);
	}


	function renderButtons() {
		$("#buttons-view").empty();

		for (var i = 0; i < recent.length; i++) {
			var a = $("<button>");
			a.addClass("recentgif");
			a.attr("data-name", recent[i]);
			a.text(recent[i]);
			$("#buttons-view").append(a);
		}
	}


	$("#add-gif").on("click", function(event) {
		event.preventDefault();
		var value = $("#gif-input").val().trim();
		console.log(value);
		recent.push(value);
		renderButtons();

	});

		renderButtons();
});