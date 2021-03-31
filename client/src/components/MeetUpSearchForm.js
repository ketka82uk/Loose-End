import React from 'react'
import { Link } from 'react-router-dom'

const MeetUpSearchForm = ({ orientation, formData, updateFormData }) => {

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return <form onSubmit={handleSubmit}
    className={orientation}>
    <div className="select mr-2">
      <select value={formData.location}
        onChange={handleChange}
        name={'location'}
        id="homepage-select">
        <option>London</option>
      </select>
    </div>
    <input
      className="input mr-2"
      id="home-page-input"
      type="date"
      value={formData.date}
      onChange={handleChange}
      name={'date'}
    />
    <div className="select mr-2">
      <select value={formData.category}
        onChange={handleChange}
        name="category"
        id="homepage-select">
        <option>All Categories</option>
        <option>Restaurants</option>
        <option>Culture</option>
        <option>Tours</option>
        <option>Walking</option>
      </select>
    </div>
    <Link to={{ pathname: '/meetUp', state: { ...formData, location: 'london', category: formData.category.toLowerCase() } }}>
      <button className="button is-yellow-button">Search</button>
    </Link>
  </form>
}

export default MeetUpSearchForm