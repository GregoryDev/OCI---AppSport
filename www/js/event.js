/*$(document).ready(function() {
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
        tx.executeSql('INSERT INTO events (nom_event, date_event, nbPlace_event, prix_event, description_event) VALUES ("' +
                    document.getElementById("nom_event").value +'","'+
                    document.getElementById("date_event").value +'","'+
                    document.getElementById("nbPlace_event").value +'","'+
                    document.getElementById("prix_event").value +'","'+
                    document.getElementById("description_event").value+'")');
    }

    function getEvent(id){
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(getEvents, errorCB, querySuccess);
    }
    function getEvent(tx) {
        //var query = "Select * FROM events WHERE id='""'";
        tx.executeSql("Select * FROM events WHERE id=?",[id]);
    }
});

function Event(){
    this.nom;
    this.date;
    this.nbPlace;
    this.prix;
    this.description;

    this.set = function(nom,date,nbPlace,prix,descrpition){
        this.nom = nom;
        this.date =date;
        this.nbPlace = nbPlace;
        this.prix = prix;
        this.description = description;
    }

    this.getNom = function(){
        return this.nom;
    }
    this.getDate = function(){
        return this.date;
    }
    this.getnbPlace = function(){
        return this.nbPlace;
    }
    this.getPrix = function(){
        return this.prix;
    }
    this.getDescription = function(){
        return this.description;
    }
});
*/
