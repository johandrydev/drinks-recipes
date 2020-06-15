import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// Context
export const categoriesContext = createContext()

/**
 * Provider
 * @param {object} props
 */
const CategoriesProvider = props => {
  // State context
  const [categories, updateCategories] = useState([])

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

    axios
      .get(url)
      .then(res => {
        updateCategories(res.data.drinks)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <categoriesContext.Provider
      value={{
        categories
      }}
    >
      {props.children}
    </categoriesContext.Provider>
  )
}
export default CategoriesProvider
