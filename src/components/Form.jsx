import React, { useContext, useState, useEffect } from 'react'
import ErrorAlert from './ErrorAlert'
import Modal from './Modal'
import { categoriesContext } from '../context/categoriesContext'
import { recipesContext } from '../context/recipesContext'
import axios from 'axios'

const Form = () => {
  const [search, changeSearch] = useState({
    ingredient: '',
    category: ''
  })
  const [error, changeError] = useState({
    error: false,
    message: ''
  })
  const [openModal, changeOpenModal] = useState(false)
  const { categories } = useContext(categoriesContext)
  const { changeRecipes, data, selected } = useContext(recipesContext)

  useEffect(() => {
    if (selected && data) {
      changeOpenModal(true)
    } else {
      changeOpenModal(false)
    }
  }, [data, selected])

  const handleChangeVal = e => {
    changeSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (search.ingredient.trim() === '' && search.category.trim() === '') {
      changeError({
        error: true,
        message: 'All fields required'
      })
      return
    }

    const ing = search.ingredient.trim()
    const cat = search.category.trim()
    let filter = ''
    if (ing !== '') {
      filter = cat !== '' ? `?i=${ing}&c=${cat}` : `?i=${ing}`
    } else {
      filter = `?c=${cat}`
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php${filter}`
    axios
      .get(url)
      .then(res => {
        if (res.data !== '') {
          changeError({
            ...error,
            error: false
          })
          console.log(res.data.drinks)
          changeRecipes(res.data.drinks)
        } else {
          changeError({
            error: true,
            message: 'Not found recipes'
          })
        }
      })
      .catch(err => {
        changeError({
          error: true,
          message: 'Not found recipes'
        })
      })
  }
  return (
    <div className="columns">
      <div className="column is-full">
        <h4 className="title is-4 has-text-centered">
          Search by ingredient or category
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="columns px-2">
            <div className="column is-4">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search by ingredient"
                    name="ingredient"
                    value={search.ingredient}
                    onChange={handleChangeVal}
                  />
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      onChange={handleChangeVal}
                      name="category"
                      value={search.category}
                    >
                      <option value="">Select an category</option>
                      {categories.map(({ strCategory }, index) => (
                        <option key={index} value={strCategory}>
                          {strCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <button
                type="submit"
                className="button is-fullwidth is-centered has-background-link has-text-light"
              >
                Search Drinks
              </button>
            </div>
          </div>
          <div className="columns">
            {error.error && <ErrorAlert message={error.message} />}
          </div>
        </form>
        {data && <Modal open={openModal} />}
      </div>
    </div>
  )
}

export default Form
