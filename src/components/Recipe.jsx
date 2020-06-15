import React, { useContext } from 'react'

import { recipesContext } from '../context/recipesContext'

const Recipe = ({ data }) => {
  const { changeSelected } = useContext(recipesContext)

  return (
    <div className="column is-12-mobile is-6-tablet is-4-desktop">
      <div className="card">
        <header className="card-header has-background-light">
          <p className="card-header-title">{data.strDrink}</p>
        </header>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={data.strDrinkThumb} alt={data.strDrink} />
          </figure>
        </div>
        <footer className="card-footer">
          <button
            onClick={() => changeSelected(data.idDrink)}
            className="card-footer-item btn-card-fo has-background-light"
          >
            Show Recipe
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Recipe
