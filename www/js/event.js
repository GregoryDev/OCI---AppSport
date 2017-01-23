$(document).ready(function() {

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
});
