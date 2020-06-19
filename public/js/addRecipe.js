$(document).ready(function(){

  $('select').formSelect(); 
  $('.modal').modal();

   var recipeIngredients = [];

  // Have the data property pull from Ingredients table
  // Name and link to image if wanted
  $('#ingredientName').autocomplete({
    data: {
      "apple": null,
      "banana": null,
      "cheddar cheese": null
    },
  });

  $('#ingredientQuantity').autocomplete({
    data: {
      1: null,
      0.25: null,
      0.75: null
    },
  });

  $('#ingredientMeasurement').autocomplete({
    data: {
      "tsp": null,
      "Tbsp": null,
      "cup": null
    },
  });

  function submitRecipe(recipeData){
    $.post("/api/recipes", recipeData);
  };
  
  function addRecipe(event){
    event.preventDefault();

    var recipeName = $("#recipeName").val();
    var recipeInstructions = $("#instructions").val(); 
    var recipeImage = $("#recipeImage").val(); 
    var recipeCategory = $("#recipeCategory").val(); // Actual selection
    var categorySelection =  $("#recipeCategory").prop("value"); // Check that it is not the default
    var recipeAuthor = $("#recipeAuthor").val(); 

    if(recipeName != "" && recipeInstructions != "" && recipeIngredients != " " && categorySelection > 0){
      let newRecipe = {
        name: recipeName,
        instructions: recipeInstructions,
        ingredients: JSON.stringify(recipeIngredients),
        image: recipeImage,
        category: recipeCategory,
        author: recipeAuthor
      };

      submitRecipe(newRecipe);

      $("#recipeName").val("");
      $("#instructions").val(""); 
      $("#recipeImage").val(""); 
      $("#recipeAuthor").val("Unknown"); 
      $("#selectedIngredients").val("");
    }; 
  };

  function addIngredient(event){
    event.preventDefault();

    var ingredientName = $("#ingredientName").val();
    var ingredientQuantity = $("#ingredientQuantity").val();
    var ingredientMeasurement = $("#ingredientMeasurement").val();

    var addedIngredients = $("#selectedIngredients").val();

    // Check for blank values
    if(ingredientName != "" && ingredientQuantity != "" && ingredientMeasurement != ""){
      var newIngredient = ingredientName + " " + ingredientQuantity + " " + ingredientMeasurement;
    } else {
      var newIngredient = "";
    }
    
    if(newIngredient != "") {
      if(addedIngredients === " "){
        $("#selectedIngredients").html(newIngredient);
      } else{
        $("#selectedIngredients").html(addedIngredients + "\n" + newIngredient);
      };
      // name (string), quantity (int), measurement (string)
      let ingredient = {
        name: ingredientName,
        quantity: ingredientQuantity,
        measurement: ingredientMeasurement
      }
      
      recipeIngredients.push(ingredient);

      $("#ingredientName").val("");
      $("#ingredientQuantity").val("");
      $("#ingredientMeasurement").val("");
      M.textareaAutoResize($('#selectedIngredients'));
    };
  };

  $("#ingredientAdd").on("click", addIngredient);
  $("#recipeSubmit").on("click", addRecipe);










})



