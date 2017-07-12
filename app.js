firebase.initializeApp(config);
var categoriesList=[];
var currentCategory;
var bgImageList={};
var currentImageKey;
var curCategImageList=[];
var bgImageSelected = false; 




function main() {
  getCategoriesListDBAndDisplay();
}
function displayCategories(){

  var html_list = document.getElementById("category_list");
  while (html_list.firstChild) {
    html_list.removeChild(html_list.firstChild);
  }  
  for(i=0;i<categoriesList.length;i++){
    var entry = document.createElement('li');	
	
	entry.addEventListener('click', displayBackgroundMaterial); 	 
	var a = document.createElement('a');  
	a.id=String(config.apiKey)+categoriesList[i];  
    a.appendChild(document.createTextNode(categoriesList[i]));	
    a.href = "#";	
    entry.appendChild(a);	
    html_list.appendChild(entry);
  }
}

var displayImageBG=function(e){	
    bgImageSelected=true;
    document.getElementById("deleteBGImageButton").style.display="inline-block";  
	currentImageKey= e.target.innerText;
	var currentImageValue=(bgImageList[currentImageKey]);	
	console.log("currentImageValue is "+currentImageValue);
	downloadAndDisplayImage(currentImageValue,"bgImage");		
}

function uploadImagesBG(files){

  for(var i=0; i<files.length;i++){
  		  var file = files[i];		  
		  if(file.type!="image/png"){
    		  alert("File "+ file +" is not png!");
    		  return;
		  }  
  }    
  uploadFilesDB(files,"questions/"+currentCategory+"/material/imgs");
}
   
function returnImageName(existingArray,name){
   var currentName;
   var counter=0;		 
   while(true){
       currentName="img"+counter+name;
       if(existingArray.contains(currentName)==false){
	   	    return currentName;       
       }
	   counter=counter+1; 
   }
}



/*_______________________________________________QUESTIONS_START____________________________________________________________________*/
var questionsList=[];
var currentCategoryQuestions;

function displayQuestions(){
  document.getElementById("background_materialHTML").style.display = "none";
  questionsHTML=document.getElementById("questions_block");
  questionsHTML.style.display="block"; 
  getAllQuestionsAndDisplayDB();  
}


function displayQuestionList(){
var html_list = document.getElementById("question_list");
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
	document.getElementById("questionContainer").style.visibility="visible";
	getQuestionAndDisplayDB(currentQuestion);		
}


function createAnswerRow(name){

  var div = document.createElement("div");
  div.class="flex-itemRow";
  var txt=document.createElement("textarea");
    txt.style.width="600px";
    txt.style.height="inherit";
	txt.setAttribute("id", "textarea"+name);
  var saveButton=document.createElement("button");
  saveButton.innerHTML="Save changes";
  var discardButton=document.createElement("button");
  saveButton.innerHTML="Discard changes";
  var deleteButton=document.createElement("button");
  saveButton.innerHTML="Delete current question";
  div.appendChild(txt);
  div.appendChild(saveButton);
  div.appendChild(discardButton);
  div.appendChild(deleteButton);
  return div; 
}


function createEmptyQuestion(){
  var questionName = document.getElementById("questionName").value;
  document.getElementById("questionName").value=null;
  if(questionsList.contains(questionName)){
  	alert("Question with this name already exists!");  
  }else{
  		if(questionName==null|| questionName==""){
		alert("You must assign a name");		
		}
		else{
  	  createEmptyQuestionDB(questionName);
	  getAllQuestionsAndDisplayDB();	 
	  }  	    	  
  }
}

/*_______________________________________________QUESTIONS_END____________________________________________________________________*/
//Event handler for selecting a category
var displayBackgroundMaterial = function( e ){  
    
	document.getElementById("questions_block").style.display="none";	
	
	e.target.classList.add("active");
	if(document.getElementById(String(config.apiKey)+currentCategory)!=null){	   
	   document.getElementById(String(config.apiKey)+currentCategory).classList.remove("active");	
	}
	currentCategory= e.target.innerText;	
	console.log("Curent category is"+currentCategory);
	getCategoryBackgroundMaterialDB();		
	getListOfBGImagesAndDisplayDB();  
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
  		if(categoryName==null|| categoryName==""){
		alert("You must assign a name");		
		}
		else{
  	  createEmptyCategoryDB(categoryName);
	  getCategoriesListDBAndDisplay();	
	  }  	    	  
  }
}



var currentCategoryBGText;
function saveBMChanges(){
 var bmText = document.getElementById("backgroundMaterialText").value;
 updateCategoryMaterialDB(currentCategory,bmText);
 currentCategoryBGText=bmText; 
}

function discardBMChanges(){
document.getElementById("backgroundMaterialText").value=currentCategoryBGText;
}


function uniqueID(){
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
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
