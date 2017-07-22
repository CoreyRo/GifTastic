$(document).ready(function($) {



	var apiKey = "dc6zaTOxFJmzC";
	var limit = 12;
	var recent = ["McCree", "POTG", "Fail", "The Big Lebowski"];
	// var queryURL = "http://api.giphy.com/v1/gifs/search?" + value + "&api_key=dc6zaTOxFJmzC&limit=5";
	function playGif(played){
		
		var state = $(this).attr("data-state");
    	var animated = $(this).attr("data-animate");
    	var still  = $(this).attr("data-still");

    	if(state === "still"){
	    	$(this).attr("data-state", "animate");
	    	$(this).attr("src", animated);
    	}
    	else{
    		$(this).attr("data-state", "still");
	    	$(this).attr("src", still);
    	}
    	
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

	function gifButton(value){
	$("#gif-view").empty();
	value = $(this).attr('data-name').replace(" ", "+");
	console.log(value);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + apiKey + "&limit=" + limit;
	
	// var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=" + value;

	console.log(queryURL);
	$.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response) {
        var results = response.data;
        console.log(results);
        for(var i = 0;i < results.length; i++){
        	var gifDiv = $("<div class='col-md-4 item'>");
            var gifStill = results[i].images.fixed_height_still.url;
            console.log(gifStill)

            

            var gifImg = $("<img class='center-block still'>");
            gifImg.attr("data-still", results[i].images.fixed_height_still.url)
            gifImg.attr("data-animate", results[i].images.fixed_height.url)
            gifImg.attr("data-state", "still");
            gifImg.attr("src", results[i].images.fixed_height_still.url);
            console.log
           	
            gifDiv.prepend(gifImg);

            $("#gif-view").prepend(gifDiv);
        }
        $(document).on("click", "img.still", playGif);
        

	});
	
    

	}

	// $.ajax({
 //        url: queryURL,
 //        method: "GET"
 //    })
 //    .done(function(response) {
 //        var results = response.data;

 //        
 //    });
	// }

	$(document).on("click", "button.recentgif", gifButton);
	


	

	$("#add-gif").on("click", function(event) {
		event.preventDefault();
		console.log(recent);
		var value = $("#gif-input").val().trim();
		console.log(value);
		recent.push(value);
		renderButtons();
	
	});

		renderButtons();
});