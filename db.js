/*_______________________________________________CATEGORY_METHODS____________________________________________________________________*/


function getCategoriesListDBAndDisplay(){
  var queryCategories =  firebase.database().ref("Categories").orderByKey();
  document.getElementById("background_materialHTML").style.display="none";  
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
function createEmptyQuestionDB(questionName){
	firebase.database().ref('questions').child(currentCategory).child('questions').child(questionName).set({
      img:"",
      answers:"",
      questionId: questionName,
      text:"" 
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
  		 document.getElementById("backgroundMaterialText").value=currentCategoryBGText;		
		 document.getElementById("background_materialHTML").style.display = "block";	
		 		
      });	
	   if(bgImageSelected==true)document.getElementById("bgImage").src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";		 
}
function getAllQuestionsAndDisplayDB(){
var allQuestionsQuery= firebase.database().ref("questions").child(currentCategory).child("questions").orderByKey();
  allQuestionsQuery.once("value").then(
      function(snapshot) {	  
	  questionsList=[];	    
  		var html_list = document.getElementById("question_list");
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

function getQuestionAndDisplayDB(currentQuestion){
 var oneQuestionQuery= firebase.database().ref("questions").child(currentCategory).child("questions").child(currentQuestion).orderByKey();
  oneQuestionQuery.once("value").then(
        function(snapshot) {   	  	   
        	snapshot.forEach(function(childSnapshot) {
              key=childSnapshot.key;			  
			  if(key=="answers"){
			     childSnapshot.forEach(function(answerSnapshot){
				      console.log("Creating row for"+answerSnapshot.key);
					  createAnswerRow(answerSnapshot.key,"questionContainer");
					  var answer=answerSnapshot.val();
					  console.log(answer);
					  document.getElementById("textarea"+answerSnapshot.key).innerHTML=answer["text"];
					  downloadAndDisplayImage(answer["img"],"image"+answerSnapshot.key);					 					  		    
				 });//childSnapshot.forEach end	
				 createHugeButton("questionContainer");   
			  } else{
    			  if(key=="img"){
    			   //load image				   
				   downloadAndDisplayImage(childSnapshot.val(),"questionImg");				   
				   
    			  } else{
    			  	if(key=="text")  document.getElementById("questionText").innerHTML=childSnapshot.val();
    			  }
			  }
    			
    	    });  						
         }
    );  
}



















function getListOfBGImagesAndDisplayDB(){
var allImagesQuery= firebase.database().ref("questions/"+currentCategory+"/material/imgs");
allImagesQuery.once("value").then(
      function(snapshot) {
	  	 
	  var html_list = document.getElementById("image_list_bg");
      while (html_list.firstChild) {
        html_list.removeChild(html_list.firstChild);
      }
	  curCategImageList=[];
	  bgImageList={};
      snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
		  curCategImageList.push(key);
      	  var value=childSnapshot.val();   	 
          bgImageList[key]=value;			
	      var entry = document.createElement('li');		
          entry.addEventListener('click', displayImageBG);          
          entry.appendChild(document.createTextNode(key));          
          html_list.appendChild(entry);  			
    	    });
			
			
       }
  ).catch(function(error) {
   alert("Request to image list for background material failed with following error: "+error);
});  	



}




/*_______________________________________________STORAGE_METHODS____________________________________________________________________*/
  
  
//  
//downloads image with name ImageStorageName and loads into img with id ImageHTML
function downloadAndDisplayImage(ImageStorageName,ImageHTML){
		 var imageRef = firebase.storage().ref(ImageStorageName).getDownloadURL().then(function(url) {         
    		 console.log("ImageHTML is "+ ImageHTML);
           var img = document.getElementById(ImageHTML);
		   console.log("create img  is "+ img);
           img.src = url;
  		 }).catch(function(error) {
              alert("During downloading of background material images following error occured: "+error);
           });
}	

function uploadFilesDB(files,reference){
  firebase.storage().ref().putFiles(files,reference).then(function(metadatas) {    
   alert("Uploaded!");
   getListOfBGImagesAndDisplayDB();
	
  }).catch(function(error) {
    // If any task fails, handle this
  });
}

firebase.storage().ref().constructor.prototype.putFiles = function(files,reference) 

{ 
  var ref = this;
  const filesArr = [...files];
  return Promise.all(filesArr.map(function(file) {
    var id=uniqueID();
	console.log("ID is "+id);
	initialName=file.name.substring(0, file.name.length - 4);
	var name=returnImageName(curCategImageList,initialName);
	console.log("Name is "+name);	
    firebase.database().ref(reference).child(name).set(id);	 
    return ref.child(id).put(file);
  }));
}


function deleteCurrentImageBG(){
  
  var desertRef = firebase.storage().ref(bgImageList[currentImageKey]);

      // Delete the file
      desertRef.delete().then(function() {
        firebase.database().ref('questions').child(currentCategory).child("material").child("imgs").child(currentImageKey).set(null);
		document.getElementById("bgImage").src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		currentImageKey="";
		getListOfBGImagesAndDisplayDB();
		
		
      }).catch(function(error) {
        alert("Error occured during file deletion: "+ error);
      });
  
  
  
  
  //delete from database
  //delete from storage
  
}






