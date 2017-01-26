$(document).ready(function() {

    var open = false;

    function initialize(){      
        $("#div_create_event").hide();
        $("#desc_event").hide();
        $("#listing_event").hide();
        $("#div_create_user").hide();
        $("#menu_co").hide();
        $("#menu_deco").hide();
        $("#div_create_organisation").hide();
        $("#desc_organisation").hide();
        $("#desc_utilisateur").hide();
        $("#div_notation").hide();
        $("#map").hide();
        $("#gestion_inscription").hide();
        $("#div_profil").hide();
        $("#recherche_nom").hide();
        $("#div_recherche_avancee").hide();
        $("#myEvents").hide();
        $("#div_connexion").hide();
    }

    initialize();
        $("#recherche_nom").show();

    $("#logo").click(function(){
        initialize();
        $("#recherche_nom").show();
    })

    $("#profil").click(function(){
        initialize();
        $("#div_profil").show();
    });

    $("#search").click(function(){
        initialize();
        $("#recherche_nom").show();
        $("#div_recherche_avancee").show();
    });
    $("#search_co").click(function(){
        initialize();
        $("#recherche_nom").show();
        $("#div_recherche_avancee").show();
    });

    $("#displayCreateEvent").click(function(){
        initialize();
        $("#div_create_event").show();      
    });

    $("#createOrga").click(function(){
        initialize();
        $("#div_create_user").show();
    });

    $("#connexion").click(function(){
        initialize();
        $("#div_connexion").show();
    });

    $("#select").change(function(){
        initialize();
        if(('#select').find(":selected").val() == 2)
            $("#div_create_organisation").show();
        else
            $("#div_create_user").show();
    });


    $("#searchBtn").click(function(){
        getAllEvents($("#search_global").val());
        $("#listing_event").show();
    });

    $("#menuBtn").click(function(){
        if(open){
            open = false;
            if($("#logged").attr("class") == "-1"){
                $("#menu_deco").hide();
             }
            else{
                $("#menu_co").hide();
            }
        } else {
            open = true;
            if($("#logged").attr("class") == "-1"){
                $("#menu_deco").show();
             }
            else{
                $("#menu_co").show();
            }
        }
    })


    function getEvent(id){
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(function(tx){
            console.log("getEvents : "+id+"/"+tx);
            tx.executeSql("Select e.*, u.* FROM events e, users u WHERE e.creator_event=u.id AND e.id=?",[id],getEventSuccess,errorCB);
        }
        , errorCB, transacSuccess);
    }

    function getEventSuccess(tx, results){
    	console.log(results);
    	$("#desc_event").html("");
    	e = results.rows[0];
    	var str = '<div class="row">'+
    	'<div class="col-xs-8"><b>'+e.nom_event+'</b></div>'+
    	'<div class="col-xs-4">'+e.prix_event+'</div></div>'+
    	'<div class="row"><div class="col-xs-4">'+e.type_event+'</div>'+
    	'<div class="col-xs-4">'+e.date_event+'</div><div class="col-xs-4">'+e.nbPlace_event+'</div></div></br>'+
    	'<div class="row"><div class="col-xs-12">'+e.description_event+'</div></div></br>'+
    	'<div class="solid"><div class="row"><div class="col-xs-4"><img src="img/default.png" class="img-responsive"></div>'+
    	'<div class="col-xs-8"><div class="row"><div class="col-xs-9">'+e.nom_user+'</div><div class="col-xs-3">4*</div>'+
    	'</div></div></div></div>';
    	
            console.log(($("#logged").attr("class") != "-1"));
    	$("#desc_event").append(str);
        if($("#logged").attr("class") != "-1"){
            $("#desc_event").append("<button id=\"submit_inscription\" class=\"btn btn-block btn-success\"> S'inscrire</button>");
        }
    	$("#desc_event").show();
    }

    function getAllEvents(like = "%"){
        var search = '%'+like+'%';
        console.log("param : "+search);
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(function(tx){
            tx.executeSql("Select * FROM events WHERE (nom_event LIKE ?) OR (type_event LIKE ?) OR (location_event LIKE ?) OR (description_event LIKE ?)",[search,search,search,search],querySuccessAll,errorCB);
        }
        , errorCB, transacSuccess);
    }

    //Todo: Gerer resultat query
    function querySuccessAll(tx,results){
            $("#listing_event ul").html("");
            $.each(results.rows,function(i,e){
                var new_event = "<li class=\""+ e.id +"\">"+
                    "<div class=\"row\">"+
                        "<div class=\"col-xs-4\"><img src=\"img/default.png\" class=\"img-responsive\" ></div>"+
                        "<div class=\"col-xs-8\">"+
                            "<div class=\"row\">"+
                                "<div class=\"col-xs-12\">"+e.nom_event+"</div>"+
                                "<div class=\"col-xs-12\">"+e.type_event+"</div>"+
                                "<div class=\"col-xs-12\">"+e.date_event+"</div>"+
                            "</div>"+
                            "<div class=\"row\">"+
                                "<div class=\"col-xs-6\">5*</div>"+
                                "<div class=\"col-xs-6\">"+e.prix_event+"€</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "</li>";

                console.log(new_event);
                $("#listing_event ul").append(new_event);
            });
            $("#listing_event ul li").click(function(){
            	initialize();
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

    $("#myEventsBtn").click(function(){
    	initialize();
    	$("#myEvents").show();
    	getMyEvents($("#logged").attr("class"));
    });

    function getMyEvents(id){
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM events WHERE creator_event=?",[id],getMyEventsSuccess,errorCB);
        }
        , errorCB, transacSuccess);	
    }

    function getMyEventsSuccess(tx, results){
    	$("#myEvents").html("");
    	$.each(results.rows, function(i,e){
    		$("#myEvents ul").append("<li>"+e.nom_event+"</li><br />");
    	});
    }
});
