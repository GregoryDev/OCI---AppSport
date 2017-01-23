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
	    //tx.executeSql('DROP TABLE events');
            tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, nom_event text, date_event date, nbPlace_event integer, prix_event integer, description_event text)');
        }
// 

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

	// Insert event
        $("#submit_event").click(function goInsertEvent() {
            var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
            db.transaction(insertEvent, errorCB, querySuccess);
        })
        function insertEvent(tx) {
            tx.executeSql('INSERT INTO events (nom_event, date_event, nbPlace_event, prix_event, description_event) VALUES ("' +
		document.getElementById("nom_event").value +'","'+
		document.getElementById("date_event").value +'","'+
		document.getElementById("nbPlace_event").value +'","'+
		document.getElementById("prix_event").value +'","'+
		document.getElementById("description_event").value+'")');
        }
	//document.getElementById

});
