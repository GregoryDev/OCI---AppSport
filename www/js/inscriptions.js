$(document).ready(function() {
    // Query the success callback
    function querySuccess(tx, results) {
        console.log(results);
    }

    // Query the database
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM inscriptions', [], querySuccess, errorCB);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }

    // Insert user
    $("#submit_inscription").click(function() {
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(insertInscription, errorCB, querySuccess);
    })
    function insertInscription(tx) {
        tx.executeSql('INSERT INTO inscriptions (id_user, id_event) VALUES ("' +
                    $("#logged").attr("class") +'","'+
                    $("#desc_event").attr("class") +'")');
    }
});

