firebase.initializeApp(config);
var db = firebase.database(); 
var queried=false;
var snapshotGlobal;




function main() {
queryQuestions("questions");  

  
	
}


//retrieves whole questions subtree, CALL ONLY ONCE or on new category creation.
function queryQuestions(parent){
var queryCategories = db.ref(parent).orderByKey();
  queryCategories.once("value").then(
    function(snapshot) {
	 queried=true; 
	 snapshotGlobal=snapshot;
	 var categoriesList=getCategories();
	 displayCategories(categoriesList);
    });
}

function displayCategories(cat_list){
  var html_list = document.getElementById("category_list");
  for(i=0;i<cat_list.length;i++){
    var entry = document.createElement('li');
	entry.addEventListener('click', clickEvent);    
	var underlineText = document.createElement("U");   
    underlineText.appendChild(document.createTextNode(cat_list[i]));
	entry.appendChild(underlineText);	
    html_list.appendChild(entry);
  }
}

//Event handler for selecting a category
var clickEvent = function( e ){      
      alert( 'Clicked! ' + e.target.innerText );
}


//returns list of all categories
function getCategories(){
  var categoriesList=[];
  snapshotGlobal.forEach(function(childSnapshot) {
        // key will be names of categories
        var key = childSnapshot.key;
  	  categoriesList.push(key);
  	  console.log(key);
        // childData will be the actual contents of the child
        //var childData = childSnapshot.val();
    }); 
  return categoriesList; 
}
function createCategory(){
//1) check that categoryname is unique

}







