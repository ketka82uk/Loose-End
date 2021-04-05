import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'
import restaurantCategories from '../data/restaurants/restaurantCategories.js'

const Restaurants = () => {
  const [restaurantData, updateRestaurantData] = useState([])
  const [priceRange, updatePriceRange] = useState('Any price range')
  const [category, updateCategory] = useState('All categories')
  const [loading, updateLoading] = useState(true)
  const [numberOfRestaurants, updateNumberOfRestaurants] = useState(0)
  const loggedIn = getLoggedInUserId()


  useEffect(() => {
    axios.get('/api/restaurants')
      .then(resp => {
        const filteredRestData = resp.data.filter(restaurant => {
          return restaurant.price && restaurant.category
        })
        updateRestaurantData(filteredRestData)
        updateLoading(false)
        updateNumberOfRestaurants(filteredRestData.length)
      })
  }, [])


  function filterRestaurants() {
    return restaurantData.filter(restaurant => {
      return (priceRange === 'Any price range' || restaurant.price === priceRange)
        && (category === 'All categories' || (restaurant.category.includes(category)))
    })
  }

  function NoRestaurants() {
    const filteredData = restaurantData.filter(restaurant => {
      return (priceRange === 'Any price range' || restaurant.price === priceRange)
        && (category === 'All categories' || (restaurant.category.includes(category)))
    })
    if (filteredData.length < 1) {
      updateNumberOfRestaurants(filteredData.length)
      return <div className="title is-4">Sorry, nowhere matches your search!</div>
    }
    updateNumberOfRestaurants(filteredData.length)
    return null
  }

  if (loading) {
    return <h1>Loading</h1>
  }


  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

    <section className="hero yellow-section">
      <div className="hero-body">
        <p className="title">
          Food & Drink
        </p>
        <p className="subtitle">
          Browse below, filter by price, search by name or suggest your own!
        </p>
      </div>
    </section>

    {/*
    // * LEVEL SECTION
    */}

    <section className="gray-section py-2">
      <div className="container">

        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{numberOfRestaurants}</strong> restaurants
              </p>
            </div>
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <div className="select">
                    <select onChange={(event) => updatePriceRange(event.target.value)}>
                      <option>Any price range</option>
                      <option>£</option>
                      <option>££</option>
                      <option>£££</option>
                      <option>££££</option>
                    </select>
                  </div>
                </p>
                <p className="control">
                  <div className="select">
                    <select onChange={(event) => updateCategory(event.target.value)}>
                      <option>All categories</option>
                      {restaurantCategories.map((restaurant, i) => {
                        return <option value={restaurant.value} key={i}>{restaurant.label}</option>
                      })}
                    </select>
                  </div>
                </p>
              </div>
            </div>
            <div className="level-item">
              <div className="button is-warning is-light">
                <span className="icon is-small">
                  🧭
                </span>
                <span className="subtitle"><Link to='/map/fd'>See on a map</Link></span>
              </div>
            </div>
          </div>

          {loggedIn && <div className="level-right">
            <div className="level-item">
              <div className="subtitle">Have we missed somewhere?</div>
            </div>
            <div className="level-item">
              <div className="is-link is-warning is-light subtitle"><Link to='/activities/create-restaurant'>Add somewhere new!</Link></div>
            </div>
          </div>}

        </div>
      </div>
    </section>

    {/*
    // * RESTAURANT LIST SECTION
    */}

    <section className="section">
      <div className="columns">
        <div className="column"></div>
        <div className="column is-three-quarters">
          {filterRestaurants().map((restaurant, index) => {
            return <div key={index} className="column">
              <Link to={`/activities/${restaurant._id}`}>
                <div className="card horizontal-card">
                  <div className="horizontal-card-image" style={{
                    backgroundImage: `url(${restaurant.image})`,
                    backgroundSize: 'cover'
                  }}>
                  </div>
                  <div className="horizontal-card-content ml-4 my-2">
                    <div className="media">
                      <div className="media-content">
                        <div className="horizontal-card-title">{restaurant.name}</div>
                        <div className="horizontal-card-buttons">
                          {restaurant.category.map((cat, index) => {
                            return <div className="button is-success is-light mr-2" key={index}>{cat}</div>
                          })}
                        </div>
                        <div className="horizontal-card-text">{restaurant.price} </div>
                        <div className="control-row">
                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-light" style={{
                                fontSize: '20px',
                                color: '#ffba40'
                              }}>⭐️</span>
                              <span className="tag is-warning is-light" style={{
                                fontSize: '20px',
                                color: '#ffba40'
                              }}>1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </div>
          })}
          <NoRestaurants />
        </div>
        <div className="column"></div>
      </div>
    </section>


  </div>

}


export default Restaurants