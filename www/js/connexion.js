$(document).ready(function() {
    // Query the success callback
    function querySuccess(tx, results) {
        console.log(results);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }

    // Connexion
    $("#connexion").click(function goInsertUser() {
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(insertUser, errorCB, querySuccess);
    })

    // Deconnexion
    $("#deconnexion").click(function () {
	$("#logged").attr("class", "-1");
    })
});

