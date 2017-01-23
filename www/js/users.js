$(document).ready(function() {
    // Query the success callback
    function querySuccess(tx, results) {
        console.log(results);
    }

    // Query the database
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM users', [], querySuccess, errorCB);
    }

    // Transaction error callback
    function errorCB(err) {
        alert("Error processing SQL: "+err.code + ": " + err.message);
    }

    // Insert user
    $("#submit_user").click(function goInsertUser() {
        var db = window.openDatabase("Database", "1.0", "AppSport", 2000000);
        db.transaction(insertUser, errorCB, querySuccess);
    })
    function insertUser(tx) {
        tx.executeSql('INSERT INTO users (type_user, pseudo_user, nom_user, prenom_user, email_user, password_user) VALUES ("' +
                    $("#type_user").val() +'","'+
                    $("#pseudo_user").val() +'","'+
                    $("#nom_user").val() +'","'+
                    $("#prenom_user").val() +'","'+
                    $("#email_user").val() +'","'+
                    $("#password_user").val() +'")');
    }
});

