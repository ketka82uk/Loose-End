import React, { useState, useEffect } from 'react'
import MeetUpSearchForm from './MeetUpSearchForm'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'

const MeetUpSearch = () => {
  const [meetUps, updateMeetUps] = useState([])
  const [loading, updateLoading] = useState(true)
  const [formData, updateFormData] = useState({
    location: '',
    date: new Date().toISOString().substr(0, 10),
    category: 'All Categories'
  })

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/meetUps/')
      updateMeetUps(data)
      updateLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

  return <div id="meetUpSearchPage">
    <section className="hero is-fullheight-with-navbar" id="meetUpHeroBackground">
      <div className="hero-body" id="meetUpSearchHero">
        <p className="title" id="meetUpSearchTitle">
          Search MeetUps
        </p>
        <MeetUpSearchForm orientation="meetUpSearchRow" formData={formData} updateFormData={updateFormData} />
      </div>
    </section>
    <section>
      <div className="columns is-multiline">
        {meetUps.map((meetUp) => {
          return <div className="column is-one-quarter" key={meetUp._id}>
            <Link to={`/items/${meetUp._id}`}>
              <div className='card'>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={meetUp.image} />
                  </figure>
                </div>
                <div className="card-content py-1 px-1">
                  <p className="text mb-4"><strong>{meetUp.name}</strong></p>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </section>
  </div>
}

export default MeetUpSearch