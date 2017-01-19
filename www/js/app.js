$(document).ready(function() {

	var open = false;

	function initialize(){		
    	$("#div_create_event").hide();
    	//$("#desc_event").hide();
    	$("#listing_event").hide();
    	$("#div_create_user").hide();
    	$("#menu").hide();
    	$("#div_create_organisation").hide();
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
		$("#desc_event").show();
	});

	$("#menuBtn").click(function(){
		if(open){
			$("#menu").hide();
			open = false;
		} else {
			$("#menu").show();
			open = true;
		}
	})

    //On submit create event form
    //TODO: ranger ca dans la bdd
    $("#create_event").submit(function( event ) {
          //alert( "Handler for .submit() called." );
    });

});
