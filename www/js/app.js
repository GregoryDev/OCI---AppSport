$(document).ready(function() {


	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
	alert("TOTO");
	var myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});

	myDB.transaction(function(transaction) {
		transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, title text, desc text)', [],
		function(tx, result) {
			alert("Table created successfully");
		},
		function(error) {
			alert("Error occurred while creating the table.");
		});
	});
	};


});
