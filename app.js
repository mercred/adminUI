firebase.initializeApp(config);
var categoriesList=[];
var questionsList=[];
var currentCategory;
var currentCategoryBGText;
var currentCategoryQuestions;
var allQuestions;

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
	entry.addEventListener('click', displayBackgroundMaterial);    
	var underlineText = document.createElement("U");   
    underlineText.appendChild(document.createTextNode(categoriesList[i]));
	entry.appendChild(underlineText);	
    html_list.appendChild(entry);
  }
}
function displayQuestionList(){
var html_list = document.getElementById("questionsList");
  while (html_list.firstChild) {
    html_list.removeChild(html_list.firstChild);
  }  
  for(i=0;i<questionsList.length;i++){
    var entry = document.createElement('li');
	entry.addEventListener('click', displayQuestion);    
	var underlineText = document.createElement("U");   
    underlineText.appendChild(document.createTextNode(questionsList[i]));
	entry.appendChild(underlineText);	
    html_list.appendChild(entry);
  }
}

var displayQuestion=function(e){
	
	var currentQuestion= e.target.innerText;
	console.log(currentQuestion);
	var questionHTML=document.getElementById("question");	
	questionHTML.innerHTML=allQuestions.child(currentQuestion).child("text").value;		
}


//Event handler for selecting a category
var displayBackgroundMaterial = function( e ){  
	currentCategory= e.target.innerText;
	backgr_elem=document.getElementById("background_material");
	backgr_elem.style.display = "block";
	document.getElementById("questions").style.display="none";	
	getCategoryBackgroundMaterialDB(currentCategory);		  
}

function displayQuestions(){
  document.getElementById("background_material").style.display = "none";
  questionsHTML=document.getElementById("questions");
  questionsHTML.style.display="block"; 
  getAllQuestionsAndDisplayDB();  
}

function deleteCategory(){
    deleteCategoryDB(currentCategory);
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
function saveBMChanges(){
 var bmText = document.getElementById("backgroundMaterialText").value;
 updateCategoryMaterialDB(currentCategory,bmText);
 currentCategoryBGText=bmText; 
}

function discardBMChanges(){
document.getElementById("backgroundMaterialText").value=currentCategoryBGText;
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
