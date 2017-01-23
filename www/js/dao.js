$(document).ready(function() {

	// Wait for Cordova to load
        document.addEventListener("deviceready", onDeviceReady, false);

        // Cordova is ready
        function onDeviceReady() {
            var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
            db.transaction(populateDB, errorCB, successCB);
        }

        // Populate the database
        function populateDB(tx) {
	    console.log("populateDB");
            tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, nom_event text, date_event date, nbPlace_event integer, prix_event integer, description_event text)');
        }

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

        // Transaction success callback
        function successCB() {
            var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
            db.transaction(queryDB, errorCB);
        }

});
