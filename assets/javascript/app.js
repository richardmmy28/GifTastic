$( document ).ready(function() {

    // my array
    var topic = ["Troy Aikman", "Emmit Smith", "Michael Irvin", "Deion Sanders", "Ken Norton JR."];
    
    //function that displays the gif buttons
    
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("ath");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    //function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
            var ath = $("#topicInput").val().trim();
            if (ath == ""){
                return false;//no blank buttons
            }
            topic.push(ath);
    
            displayGifButtons();
            return false;
            });
    }
    
    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function() {
            topic.pop(ath);
            displayGifButtons();
            return false;
        });
    
    }
    
    // function that displays the gifs
    
    function displayGifs() {
        var ath = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ath + "&api_key=Ki1ld54bDYjkKm8BXek3JygMTfUo7pq4";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            
            var results = response.data;
            if (results == ""){
                alert("There is not a giffy for this!");	
            }
            for (var i = 0; i<results.length; i++){
                
                var gifDiv = $("<div1>");
                
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
                
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    
    
    //event listeners
    $(document).on("click", ".ath", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });