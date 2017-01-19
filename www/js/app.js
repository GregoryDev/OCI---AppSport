$(document).ready(function() {

	function initialize(){		
    	$("#create_event").hide();
    	$("#desc_event").hide();
    	$("#listing_event").hide();
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

    //On submit create event form
    //TODO: ranger ca dans la bdd
    $("#create_event").submit(function( event ) {
          //alert( "Handler for .submit() called." );
    });
        
    function clickFoot(){
    	$("#listing").hide();
    	$("#desc_event").show();
    }

    document.addEventListener('deviceready', function() {
        myDB = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
    });

    myDB.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, title text, desc text)', [],
                function(tx, result) {
                    alert("Table created successfully");
                },
                function(error) {
                    alert("Error occurred while creating the table.");
                });
    });

});
