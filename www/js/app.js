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
        $("#div_notation").hide();

    }

    initialize();

    $("#logo").click(function(){
        initialize();
    })

    $("#displayListing").click(function(){
        initialize();
        getAllEvents();
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
        if(('#select').find(":selected").val() == 2)
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
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(function(tx){
            console.log("getEvents : "+id+"/"+tx);
            tx.executeSql("Select * FROM events WHERE id=?",[id],querySuccess,errorCB);
        }
        , errorCB, transacSuccess);
    }

    function getAllEvents(like = "%"){
        console.log("param : "+like);
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(function(tx){
            tx.executeSql("Select * FROM events WHERE (nom_event LIKE ?)",['%'+like+'%'],querySuccessAll,errorCB);
        }
        , errorCB, transacSuccess);
    }

    //Todo: Gerer resultat query
    function querySuccessAll(tx,results){
        var list =
            $.each(results.rows,function(i,e){
                var new_event = "<li class = \""+ e.id + "\">"+
                    "<div class=\"row\">"+
                    "<div class=\"col-xs-4\"><img src=\"img/default.png\" class=\"img-responsive\" ></div>"+
                    "<div class=\"col-xs-8\">"+
                    "<div class=\"row\">"+
                    "<div class=\"col-xs-12\">"+e.nom_event+"</div>"+
                    "<div class=\"col-xs-12\">"+e.type_event+"</div>"+
                    "<div class=\"col-xs-12\">"+e.date_event+"</div>"+
                    "<div class=\"row\">"+
                    "<div class=\"col-xs-6\">5*</div>"+
                    "<div class=\"col-xs-6\">"+e.prix_event+"€</div>"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "</div></li>";

                console.log(new_event);
                $("#listing_event ul").append(new_event);
            });
    }

    //Todo: Gerer resultat query
    function querySuccess(tx, results) {
        $.each(results.rows,function(i,e){
            console.log("res : "+e.nom_event);
        });
    }

    //Transaction error callback
    function transacSuccess(tx, results){
        console.log(results);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }
});
