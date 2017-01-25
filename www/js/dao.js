$(document).ready(function() {

	// Wait for Cordova to load
        document.addEventListener("deviceready", onDeviceReady, false);

        // Cordova is ready
        function onDeviceReady() {
            var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
	    //db.transaction(dropIt, errorCB, successCB);
            db.transaction(populateDB, errorCB, successCB);
        }

	function dropIt(tx) {
	   tx.executeSql('DROP TABLE IF EXISTS events');
	   tx.executeSql('DROP TABLE IF EXISTS users');
	   tx.executeSql('DROP TABLE IF EXISTS inscriptions');
	}

        // Populate the database
        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, nom_event text, type_event text, date_event date, nbPlace_event integer, prix_event integer, description_event text)');
	    tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, type_user text, pseudo_user text, nom_user text, prenom_user text, email_user text, password_user text)');
	    tx.executeSql('CREATE TABLE IF NOT EXISTS inscriptions (id_user integer, id_event integer, primary key(id_user, id_event))');
        }

        // Query the success callback
        function querySuccess(tx, results) {
            console.log(results);
        }

        // Query the database
        function queryDB(tx) {
            tx.executeSql('SELECT * FROM events', [], querySuccess, errorCB);
            tx.executeSql('SELECT * FROM users', [], querySuccess, errorCB);
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
