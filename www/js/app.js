$(document).ready(function() {

    //On submit create event form
    //TODO: ranger ca dans la bdd
    $("#create_event").submit(function( event ) {
          //alert( "Handler for .submit() called." );
    });
    $("#create_event").hide();
        

    document.addEventListener('deviceready', function() {
        myDB = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
    });

    alert("tata");
    myDB.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, title text, desc text)', [],
                function(tx, result) {
                    alert("Table created successfully");
                },
                function(error) {
                    alert("Error occurred while creating the table.");
                });
    });

    alert('tutu');

});
