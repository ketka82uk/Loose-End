// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'
import poiTypes from '../data/poiTypes'
import RingLoader from 'react-spinners/RingLoader'
import { getLoggedInUserId } from '../lib/auth'


const Poi = () => {
  const [poiData, updatePoi] = useState([])
  const [type, updateType] = useState('All')
  const [search, updateSearch] = useState('')
  const _ = require('lodash')
  const [loading, updateLoading] = useState(true)
  const loggedIn = getLoggedInUserId()
  const [numberOfPoi, updateNumberOfPoi] = useState(0)


  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/poi/')
      updatePoi(data)
      const shuffledPoi = _.shuffle(data)
      updatePoi(shuffledPoi)
      updateLoading(false)
      updateNumberOfPoi(shuffledPoi.length)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

  function filterPoi() {
    return poiData.filter(poi => {
      return (type === 'All' || (poi.types.includes(type)))
        && poi.name.toLowerCase().includes(search.toLowerCase())
    })
  }

  return <div>

    {/*
    // * TITLE SECTION
    */}

    <section className="hero yellow-section">
      <div className="hero-body">
        <p className="title">
          Points of interest
        </p>
        <p className="subtitle">
          Browse below, filter by type, search by keyword or create your own!
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
                <strong>{numberOfPoi}</strong> places of interest
              </p>
            </div>
            <div className="level-item">
              <div className="select">
                <select onChange={(event) => updateType(event.target.value)} >
                  <option>All</option>
                  {poiTypes.map((poi, i) => {
                    return <option value={poi.value} key={i}>{poi.label}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="level-item">
              <input className="input" onChange={(event) => updateSearch(event.target.value)} placeholder="Search..." />
            </div>
            <div className="level-item">
              <div className="button is-warning is-light">
                <span className="icon is-small">
                  🧭
                </span>
                <span className="subtitle"><Link to='/map'>See on a map</Link></span>
              </div>
            </div>
          </div>

          {loggedIn && <div className="level-right">
            <div className="level-item">
              <div className="subtitle">Have we missed somewhere?</div>
            </div>
            <div className="level-item">
              <div className="is-link is-warning is-light subtitle"><Link to='/activities/createPoi'>Add somewhere new!</Link></div>
            </div>
          </div>}

        </div>
      </div>
    </section>

    {/*
    // * POI SECTION
    */}

    <section className="section">
      <div className="columns">
        <div className="column"></div>
        <div className="column is-three-quarters">

          <div className="column">
            {filterPoi().map((poi, index) => {
              const poiDescription = poi.description.split('')
              const descriptionString = poiDescription.join('')
              return <div key={index} className="column">
                <Link to={`/poi/${poi._id}`}>
                  <div className="card horizontal-card">
                    <div className="horizontal-card-image" style={{
                      backgroundImage: `url(${poi.image})`,
                      backgroundSize: 'cover'
                    }}>
                    </div>
                    <div className="horizontal-card-content ml-4 my-2">
                      <div className="media">
                        <div className="media-content">
                          <div className="horizontal-card-title">{poi.name}</div>
                          <div className="horizontal-card-buttons">
                            {poi.types.map((type, index) => {
                              return <div className="button is-success is-light mr-2" key={index}>{type}</div>
                            })}
                          </div>
                          <p className="description-text mt-2 mr-2">{descriptionString.length >= 100
                            ? descriptionString.slice(0, 100) + '...'
                            : descriptionString
                          }
                          </p>
                          <div className="description-text"><strong>{'Nearest tube station: ' + poi.tube} </strong></div>


                        </div>
                      </div>
                    </div>

                  </div>
                </Link>


              </div>
            })}
          </div>
        </div>
        <div className="column"></div>
      </div>
    </section>

  </div>
}

export default Poi