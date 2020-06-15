import React, { useState, useEffect, useContext } from 'react'
import { recipesContext } from '../context/recipesContext'

const Modal = ({ open }) => {
  const [classN, changeClass] = useState('modal')
  const { data, changeData, changeSelected } = useContext(recipesContext)

  useEffect(() => {
    console.log(data)
    changeClass(open ? 'modal is-active' : 'modal')
  }, [open, data])

  const handleClick = () => {
    changeClass('modal')
    changeData(null)
    changeSelected(null)
  }

  const showIngredients = info => {
    const ingredients = []
    for (let index = 1; index < 16; index++) {
      const element = info[`strIngredient${index}`]
      if (element) {
        ingredients.push(
          <li>
            {info[`strIngredient${index}`]} - {info[`strMeasure${index}`]}
          </li>
        )
      }
    }
    return ingredients
  }

  return (
    <div className={classN}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{data.strDrink}</p>
          <button className="delete" aria-label="close" onClick={handleClick} />
        </header>
        <section className="modal-card-body">
          <div className="card-image">
            <figure className="image is-4by3">
              <img
                src={
                  data.strDrinkThumb
                    ? data.strDrinkThumb
                    : 'https://bulma.io/images/placeholders/1280x960.png'
                }
                alt={data.strDrink}
              />
            </figure>
          </div>
          <h5 className="title is-5 has-text-centered my-4">Instructions</h5>
          <p className="has-text-centered">{data.strInstructions}</p>
          <h5 className="title is-5 has-text-centered my-4">Ingredients</h5>
          <ul className="has-text-centered">{showIngredients(data)}</ul>
        </section>
      </div>
    </div>
  )
}
export default Modal
