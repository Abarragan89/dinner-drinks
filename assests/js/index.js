"use strict";
const searchFoodBtn = document.querySelector("#search_food");
const searchDrinkBtn = document.querySelector("#search_drinks");
const apiKey = "b7dd85109d944e18aa81c263b5672588";
const recipeFoodListEl = document.querySelector("#recipe_food");
const recipeDrinkListEl = document.querySelector("#recipe_cocktails")


const getRecipeTitleAndImage = function (event) {
    event.preventDefault();
    const cuisine = getCuisine();
    const diet = getLifestyle();
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisine}&diet=${diet}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.results.length; i++){
                const listEl = document.createElement("p");
                listEl.textContent = data.results[i].title;
                recipeFoodListEl.appendChild(listEl);
                const imgEl = document.createElement("img")
                imgEl.setAttribute("src", data.results[i].image);
                recipeFoodListEl.appendChild(imgEl);
                const recipeId = data.results[i].id 
            }
        });
}

// const getRecipeCocktails = function (event) {
//     event.preventDefault();
//     const alcohol = document.querySelector("#choices_drinks").value;
//     const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             for (let i = 0; i < data.drinks.length; i++) {
//                 const listEl = document.createElement("p");
//                 listEl.textContent = data.drinks[i].strDrink;
//                 const imgEl = document.createElement("img")
//                 imgEl.setAttribute("src", data.drinks[i].strDrinkThumb)
//                 recipeDrinkListEl.appendChild(listEl);
//                 recipeDrinkListEl.appendChild(imgEl);
//             }
//         })
// }

// searchFoodBtn.addEventListener("click", getRecipeTitleAndImage);
// searchDrinkBtn.addEventListener("click", getRecipeCocktails);

function getCuisine () {
    const foodItems = [];
    const checkedItems = document.getElementsByClassName("cuisine");
    for (let i = 0; i < checkedItems.length; i++) {
        if (checkedItems[i].checked === true) {
            foodItems.push(checkedItems[i].value);
        }
    }
    const foodChoices = foodItems.join(",");
    return foodChoices;
}
function getLifestyle () {
    let lifeStyleItems = [];
    let checkedItems = document.getElementsByClassName("lifestyle");
    for (let i = 0; i < checkedItems.length; i++) {
        if (checkedItems[i].checked === true) {
            lifeStyleItems.push(checkedItems[i].value);
        }
    }
    const lifeStyle = lifeStyleItems.join(",");
    return lifeStyle;
}
searchFoodBtn.addEventListener("click", getRecipeTitleAndImage)
