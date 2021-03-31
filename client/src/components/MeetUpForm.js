import React from 'react'
import Select from 'react-select'
import { times } from '../data/times'
import interestTypes from '../data/interestTypes'

export default function MeetUpForm({ formData, handleSubmit, handleChange, handleTagChange, button }) {


  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">
            MeetUp Title*:
            </label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">
            Location*:
            </label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.location}
              onChange={handleChange}
              name="location"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">
            Date*:
            </label>
          <div className="control">
            <input type="date"
              value={new Date(formData.date).toISOString().substr(0, 10)}
              onChange={handleChange}
              name="date" />
          </div>
        </div>
        <div className="field">
          <label className="label">
            Time*:
            </label>
          <div className="control">
            <div className="select">
              <select
                value={formData.time}
                onChange={handleChange}
                name="time">
                {times.map((time) => {
                  return <option key={time}>{time}</option>
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">
            Description*:
            </label>
          <div className="control">
            <textarea
              className="textarea"
              value={formData.description}
              onChange={handleChange}
              name="description"
              placeholder="Give your MeetUp a description..."
            />
          </div>
        </div>
        <div className="field">
          <label className="label">
            Image URL:
            </label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.image}
              onChange={handleChange}
              name="image"
            />
          </div>
        </div>
        <label className="label">
          Tags:
            </label>
        <div className="control">
          <Select
            defaultValue={[]}
            isMulti
            name="tags"
            options={interestTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTagChange}
            value={formData.tags}
          />
        </div>
        <button className="button mt-5 is-success">{button}</button>
      </form>
    </div>
  </div>
}