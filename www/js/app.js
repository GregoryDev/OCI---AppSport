$(document).ready(function() {

    var open = false;

    function initialize(){      
        $("#div_create_event").hide();
        $("#desc_event").hide();
        $("#listing_event").hide();
        $("#div_create_user").hide();
        $("#menu").hide();
        $("#div_create_organisation").hide();
        $("#desc_organisation").hide();
        $("#div_recherche_avancee").hide();
        $("#desc_utilisateur").hide();
    }

    initialize();

    $("#logo").click(function(){
        initialize();
    })

    $("#displayListing").click(function(){
        initialize();
        $("#listing_event").show();     
    });

    $("#displayCreateEvent").click(function(){
        initialize();
        $("#div_create_event").show();      
    });

    $("#createOrga").click(function(){
        initialize();
        $("#div_create_user").show();
    });

    $("#select").change(function(){
        initialize();
        if($('#select option:selected').val() == '2')
            $("#div_create_organisation").show();
        else
            $("#div_create_user").show();
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


    function getEvent(id){
        console.log("getEvent : "+id);
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        //db.transaction(getEvents(id), errorCB, querySuccess);
        db.transaction(function(tx){
            console.log("getEvents : "+id+"/"+tx);
            //var query = "Select * FROM events WHERE id='""'";
            tx.executeSql("Select * FROM events WHERE id=?",[id],querySuccess,errorCB);
        }
        , errorCB, querySuccess);
    }

    function querySuccess(tx, results) {
        console.log(results);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }
});
