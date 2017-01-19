$(document).ready(function() {

	// Wait for Cordova to load
        document.addEventListener("deviceready", onDeviceReady, false);

        // Cordova is ready
        function onDeviceReady() {
            var db = window.openDatabase("Database", "1.0", "AppSport", 200000);
            db.transaction(populateDB, errorCB, successCB);
        }

        // Populate the database
        function populateDB(tx) {
	    tx.executeSql('DROP TABLE events');
            tx.executeSql('CREATE TABLE events (id INTEGER PRIMARY KEY AUTOINCREMENT, nom_event, date_event, nbPlace_event, prix_event, description_event)');
        }
// IF NOT EXISTS

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
            alert("Error processing SQL: "+err.code);
        }

        // Transaction success callback
        function successCB() {
            var db = window.openDatabase("Database", "1.0", "AppSport", 200000);
            db.transaction(queryDB, errorCB);
        }

	// Insert event
        $("#submit_event").click(function goInsertEvent() {
            var db = window.openDatabase("Database", "1.0", "AppSport", 200000);
            db.transaction(insertEvent, errorCB, querySuccess);
        })
        function insertEvent(tx) {
            tx.executeSql('INSERT INTO events (name) VALUES ("' +
		$("#nom_event").value +'","'+
		$("#date_event").value +'","'+
		$("#nbPlace_event").value +'","'+
		$("#prix_event").value +'","'+
		$("#description_event").value+'")');
        }
	//

});
