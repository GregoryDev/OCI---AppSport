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
        $("#map").hide();

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
            tx.executeSql("Select * FROM events WHERE id=?",[id],getEventSuccess,errorCB);
        }
        , errorCB, transacSuccess);
    }

    function getEventSuccess(tx, results){
    	console.log(results);
    	e = results.rows[0];
    	var str = '<div class="row">'+
    	'<div class="col-xs-8"><b>'+e.nom_event+'</b></div>'+
    	'<div class="col-xs-4">'+e.prix_event+'</div></div>'+
    	'<div class="row"><div class="col-xs-4">'+e.type_event+'</div>'+
    	'<div class="col-xs-4">'+e.date_event+'</div><div class="col-xs-4">'+e.nbPlace_event+'</div></div></br>'+
    	'<span>'+e.description_event+'</span></br>';
    	console.log(str);
    	$("#desc_event").append(str);
    	$("#desc_event").show();
    }

    function getAllEvents(){
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(function(tx){
            tx.executeSql("Select * FROM events",[],querySuccessAll,errorCB);
        }
        , errorCB, transacSuccess);
    }

    //Todo: Gerer resultat query
    function querySuccessAll(tx,results){
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

        $("#listing_event ul li").click(function(){
    	initialize();
    	console.log("test");
    	getEvent($(this).attr("class"));
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
        //console.log(results);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }
});
