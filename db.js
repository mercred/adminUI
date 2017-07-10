/*_______________________________________________OPERATIONS ON DATABASE____________________________________________________________________*/


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
  material:"Empty",
  questions:"Empty"  
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

function getCategoryQuestioinsDB(categoryName){
		 var getCategoryBackgroundMaterial =  firebase.database().ref("questions").child(categoryName).child("questions").orderByKey();  

}
function getCategoryBackgroundMaterialDB(){
  var getCategoryBackgroundMaterial =  firebase.database().ref("questions/"+currentCategory+"/material/text");  
    getCategoryBackgroundMaterial.once("value").then(
      function(snapshot) {  	    
  	     currentCategoryBGText = snapshot.val();
  		 document.getElementById("backgroundMaterialText").innerHTML=currentCategoryBGText;		 
      });			 
}
function getAllQuestionsAndDisplayDB(){
var allQuestionsQuery= firebase.database().ref("questions").child(currentCategory).child("questions").orderByKey();
  allQuestionsQuery.once("value").then(
      function(snapshot) {	
  	    allQuestions=snapshot;
  		var html_list = document.getElementById("questionsList");
          while (html_list.firstChild) {
             html_list.removeChild(html_list.firstChild);
          }
      	snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
  			questionsList.push(key);
  	    });
		displayQuestionList();
					
       }
  );  	
}







