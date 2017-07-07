
function main() {
  firebase.initializeApp(config);
  var db = firebase.database();
  console.log(db);
  var currentTime = db.ref('/current_time');
  console.log(currentTime);
  currentTime.on('value', function(snapshot) {
    document.getElementById("showServerTimelabelId").innerHTML = snapshot.val();   
  }, function(err) {console.log(err)});    
	
}







