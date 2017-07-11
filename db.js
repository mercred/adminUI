/*_______________________________________________CATEGORY_METHODS____________________________________________________________________*/


function getCategoriesListDBAndDisplay(){
  var queryCategories =  firebase.database().ref("Categories").orderByKey();  
  queryCategories.once("value").then(
    function(snapshot) {	
	    categoriesList=[];
    	snapshot.forEach(function(childSnapshot) {		      
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
  firebase.database().ref('questions').child(categoryName).child('material').child('text').set(material);  
}
/*_______________________________________________END____________________________________________________________________*/



function getCategoryQuestioinsDB(categoryName){
		 var getCategoryBackgroundMaterial =  firebase.database().ref("questions").child(categoryName).child("questions").orderByKey();  

}
function getCategoryBackgroundMaterialDB(){
  
  var getCategoryBackgroundMaterial =  firebase.database().ref("questions/"+currentCategory+"/material/text");  
    getCategoryBackgroundMaterial.once("value").then(
      function(snapshot) {  	    
  	     currentCategoryBGText = snapshot.val();	
		 console.log("Current category BG returned is"+currentCategoryBGText);	 
  		 document.getElementById("backgroundMaterialText").value=currentCategoryBGText;		
		 document.getElementById("background_materialHTML").style.display = "block";	
		 		
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

/*_______________________________________________STORAGE_METHODS____________________________________________________________________*/
  //  <img src="[url retrieved from the api]">







