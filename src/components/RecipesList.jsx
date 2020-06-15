import React, { useContext } from 'react'
import { recipesContext } from '../context/recipesContext'
import Recipe from './Recipe'

const RecipesList = () => {
  const { recipes } = useContext(recipesContext)
  return (
    <>
      <div className="columns">
        <div className="column is-full">
          {recipes.lenght > 0 && (
            <h3 className="title is-3 has-text-centered">List Recipes</h3>
          )}
        </div>
      </div>
      <div className="columns is-multiline is-mobile px-2">
        {recipes.map(recipe => (
          <Recipe key={recipe.idDrink} data={recipe} />
        ))}
      </div>
    </>
  )
}

export default RecipesList
