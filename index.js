console.log("javascript file connected");

document.getElementById('recipe').addEventListener('submit', (e) => {
    e.preventDefault()
    fetchRecipeList()
    }
)

function addRecipe(array){
   const recipeSection = document.getElementById('recipeContainer')
   array.forEach(recipeInfo => {
     const recipeCard = document.createElement('div')
     const recipeTitle = document.createElement('h2')
     const recipeImg = document.createElement('img')

    recipeCard.class = 'recipes'
    recipeTitle.textContent = recipeInfo.meal

    
    const ingredientList = document.createElement('ul')
    const instructionList = document.createElement('ol')

    const recipeList = recipeInfo.mainIngredients
    const recipeInstructions = recipeInfo.instructions
    
    recipeInstructions.forEach(instructions => {
        const li = document.createElement('li')
        li.textContent = instructions
        instructionList.append(li)    
     })
    

    recipeList.forEach(ingredients => {
        const li = document.createElement('li')
        li.textContent = ingredients;
        ingredientList.append(li)
    })

    recipeImg.src = recipeInfo.recipeImage

    recipeCard.append(recipeImg, recipeTitle, ingredientList, instructionList)

    recipeSection.append(recipeCard)
   })
}

function fetchRecipeList(){
  fetch('http://localhost:3000/Recipes')
    .then(resp => resp.json())
    .then(json => {
        console.log(json);
        addRecipe(json)
    })
}



const recipeToAdd = document.getElementById("enterRec");
    recipeToAdd.addEventListener("submit", (event) => { 
    event.preventDefault();
    let newAddRecipe = {
        meal: event.target.recipe.value,
        credit: event.target.website.value,
    }
    newRecipe(newAddRecipe)
    })






function newRecipe(newAddRecipe){
        fetch ('http://localhost:3000/Recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAddRecipe)
        })
        .then(response => response.json())
        .then(recipe => console.log(recipe))
}


