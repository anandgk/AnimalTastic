(function() {

    // Variable declaration
    var animals = ['dog', 'baboon', 'bear', 'cat'];

    // On click event when dynamically created animal buttons are clicked
    // To note, the click event is on document.body
    $(document.body).on('click', '.button-animal', function(){
        
        // Local variables
        var animal = $(this).data('animal');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Empty child elements
        $('#gifs-area').empty();

        $.ajax({
                url: queryURL,   // GIPHY API
                method: 'GET'    // Get object data from API
            })
            .done(function(response) {  // When response object is returned
                
                // Get the data from response object
                var results = response.data;
                
                // Loop through object
                for (var i = 0; i < results.length; i++) {

                    // Create div jquery object
                    var animalDiv = $('<div class="giphy-style">');

                    // Create p jquery object
                    var p = $('<p>').text("Rating: " + results[i].rating.toUpperCase());

                    // Create img jquery object
                    var animalImage = $('<img>');

                    // Add attribute and class to img object
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');
                    animalImage.addClass('click-animal');

                    // Append p object to div object
                    animalDiv.append(p);

                    // Append img object to div object
                    animalDiv.append(animalImage);

                    // Add to page GIPHY area
                    $('#gifs-area').append(animalDiv);
                    //--------------------------------
                }

            });
    });

    // On click event when dynamically created animal images are clicked
    // To note, the click event is on document.body
    $(document.body).on('click','.click-animal', function(){

        // Get the state from data attribute
        var state = $(this).attr('data-state'); 
    
        if ( state == 'still')  {  // If image is not animating
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else { // If image is animating
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }    
    });

    // Function to display animal buttons
    function renderButtons()    { 

        // Deletes the buttons 
        $('#buttons-area').empty();

        // Loops through the array of animal array
        for (var i = 0; i < animals.length; i++){

            // Create button jquery object
            var a = $('<button>') 

            // Add class and attribute to button object
            a.addClass('button-animal'); 
            a.attr('data-animal', animals[i]); 

            // Add text to button
            a.text(animals[i]); 

            // Add to button area
            $('#buttons-area').append(a); 
        }
    }

    // ========================================================

    // When form add animal button is clicked
    $('#addAnimal').on('click', function(){

        // Get value from text box
        var newAnimal = $('#animal-input').val().trim();

        //If animal already in the array then alert user of duplicate value
        if (animals.indexOf(newAnimal) > -1)    {
            alert("'" + newAnimal + "' already added. Please add a new animal!!");
        } else {
        
            // Add to array
            animals.push(newAnimal);
            
            // Call function to display buttons
            renderButtons();
        }

        // Clear text in the text box
        $('#animal-input').val('');

        // We have this line so that users can hit "enter" instead of clicking 
        // on the button and it won't move to the next page
        return false;
    })

    // ========================================================

    // Call function to display buttons
    renderButtons();
    
})();
