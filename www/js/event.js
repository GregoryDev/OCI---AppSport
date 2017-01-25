$(document).ready(function() {
    // Query the success callback
    function querySuccess(tx, results) {
        console.log(results);
    }

    // Query the database
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM events', [], querySuccess, errorCB);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }

    // Insert event
    $("#submit_event").click(function goInsertEvent() {
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(insertEvent, errorCB, querySuccess);
    })
    function insertEvent(tx) {
        tx.executeSql('INSERT INTO events (nom_event, type_event, date_event, location_event, nbInscrits_event, nbPlace_event, prix_event, description_event, teacher_event, creator_event) VALUES ("' +
                    $("#nom_event").val() +'","'+
                    $("#type_event").val() +'","'+
                    $("#date_event").val() +'","'+
                    $("#location_event").val() +'","'+
                    '0' +'","'+
                    $("#nbPlace_event").val() +'","'+
                    $("#prix_event").val() +'","'+
                    $("#description_event").val() +'","'+
                    $("#teacher_event").val() +'","'+
                    $("#logged").attr("class")+'")');
    }
});
