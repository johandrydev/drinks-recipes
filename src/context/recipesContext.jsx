import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const recipesContext = createContext()

const RecipesProvider = props => {
  const [recipes, changeRecipes] = useState([])
  const [selected, changeSelected] = useState(null)
  const [data, changeData] = useState(null)
  const [recipesFound, changeRecipesFound] = useState({})

  useEffect(() => {
    if (selected) {
      if (recipesFound[selected]) {
        changeData(recipesFound[selected])
      } else {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${selected}`

        axios
          .get(url)
          .then(res => {
            changeRecipesFound({
              ...recipesFound,
              [selected]: res.data.drinks[0]
            })
            changeData(res.data.drinks[0])
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }, [selected, recipesFound])

  return (
    <recipesContext.Provider
      value={{
        recipes,
        changeRecipes,
        selected,
        changeSelected,
        changeData,
        data
      }}
    >
      {props.children}
    </recipesContext.Provider>
  )
}

export default RecipesProvider
