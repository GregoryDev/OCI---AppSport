$(document).ready(function() {

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
    // Query the success callback
    function querySuccess(tx, results) {
        console.log(results);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }

    // Connexion
    $("#submit_connexion").click(function () {
	var pseudo = $("#connexion_pseudo").val();
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(function(tx){
            console.log("Connexion : user " + pseudo);
            tx.executeSql("SELECT password_user,id FROM users WHERE pseudo_user=?",[pseudo],verifyConnexion,errorCB);
        }
        , errorCB, querySuccess);
    })
    function verifyConnexion (tx, results) {
	var res = results.rows[0];
	if ($("#connexion_password").val() == res.password_user) {
            $("#logged").attr("class", res.id);
            initialize();
            $("#recherche_nom").show();
	}
    }

    // Deconnexion
    $("#deconnexion").click(function () {
        $("#menu_co").hide();
	    $("#logged").attr("class", "-1");
        initialize();
        $("#recherche_nom").show();
    })
});

