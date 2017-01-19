$(document).ready(function() {

	function initialize(){		
    	$("#div_create_event").hide();
    	$("#desc_event").hide();
    	$("#listing_event").hide();
    	$("#div_create_user").hide();
	}

	initialize();

	$("#displayListing").click(function(){
		initialize();
		$("#listing_event").show();		
	});

	$("#displayCreateEvent").click(function(){
		initialize();
		$("#div_create_event").show();		
	});

	$("#foot").click(function(){
		initialize();
		$("#desc_event");
	})

    //On submit create event form
    //TODO: ranger ca dans la bdd
    $("#create_event").submit(function( event ) {
          //alert( "Handler for .submit() called." );
    });
        
    function clickFoot(){
    	$("#listing").hide();
    	$("#desc_event").show();
    }

});
