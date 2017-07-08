firebase.initializeApp(config);
var categoriesList=[];




function main() {
getCategoriesListDBAndDisplay("Categories");
}





function displayCategories(){
  var html_list = document.getElementById("category_list");
  while (html_list.firstChild) {
    html_list.removeChild(html_list.firstChild);
  }
  
  for(i=0;i<categoriesList.length;i++){
    var entry = document.createElement('li');
	entry.addEventListener('click', clickEvent);    
	var underlineText = document.createElement("U");   
    underlineText.appendChild(document.createTextNode(categoriesList[i]));
	entry.appendChild(underlineText);	
    html_list.appendChild(entry);
  }
}

//Event handler for selecting a category
var clickEvent = function( e ){      
      alert( 'Clicked! ' + e.target.innerText );
}

function createEmptyCategory(){
  var categoryName = document.getElementById("categoryName").value;
  document.getElementById("categoryName").value=null;
  if(categoriesList.contains(categoryName)){
  	alert("Category with this name already exists!");  
  }else{
  	  createEmptyCategoryDB(categoryName);
	  getCategoriesListDBAndDisplay("Categories");
	  	    	  
  }
}
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
/*_______________________________________________OPERATIONS ON DATABASE____________________________________________________________________*/

/*// childData will be the actual contents of the child
        //var childData = childSnapshot.val();*/


function getCategoriesListDBAndDisplay(parent){
  var queryCategories =  firebase.database().ref(parent).orderByKey();
  categoriesList=[];
  queryCategories.once("value").then(
    function(snapshot) {	
    	snapshot.forEach(function(childSnapshot) {
            // key will be names of categories
            var key = childSnapshot.key;
      	  categoriesList.push(key);        
        });	 
	    displayCategories();
    });	
}

function createEmptyCategoryDB(categoryName) {
  firebase.database().ref('Categories').child(categoryName).set(1);
  firebase.database().ref('questions').child(categoryName).set({
  material:"",
  questions:""  
  });
}
function deleteCategoryDB(categoryName){
  firebase.database().ref('Categories').child(categoryName).set(null);
  firebase.database().ref('questions').child(categoryName).set(null);
  getCategoriesListDBAndDisplay("Categories");
}
function updateCategoryMaterialDB(categoryName,material){
  firebase.database().ref('questions').child(categoryName).child('material').set(material);
}

function getCategoryDB(categoryName){
		 
}






