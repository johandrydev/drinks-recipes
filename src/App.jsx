import React from 'react'
import Header from './components/Header'
import Form from './components/Form'
import RecipesList from './components/RecipesList'

import './main.scss'

import CategoriesProvider from './context/categoriesContext'
import RecipesProvider from './context/recipesContext'

const App = () => (
  <CategoriesProvider>
    <RecipesProvider>
      <Header />
      <div className="container mt-5">
        <Form />
        <RecipesList />
      </div>
    </RecipesProvider>
  </CategoriesProvider>
)

export default App
