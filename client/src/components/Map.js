import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import 'bulma'
import poiTypes from '../data/poiTypes'
import RingLoader from 'react-spinners/RingLoader'



// ? import components from my library
import MapGL, { Marker } from 'react-map-gl'

const Geography = () => {
  const [poiData, updatePoi] = useState([])
  const [type, updateType] = useState('All')
  const [search, updateSearch] = useState('')
  const [loading, updateLoading] = useState(true)
  const [labelIsShown, updateLabelIsShown] = useState(false)


  // ? The library requires some starting state, which I'm defining here
  const [viewPort, updateViewPort] = useState({
    height: '100vh',
    width: '100vw',
    // zoom is how zoomed in you are
    zoom: 12,
    // ? Starting lat and long, so that its centered in a good place.
    latitude: 51.515,
    longitude: -0.078
  })

  useEffect(() => {
    // ? axios.get will do a GET request, and it has similar verbs
    // ? for everything else.
    axios.get('/api/poi/')
      // ? Just one then for axios...
      .then(resp => {
        const filteredPoi = resp.data.filter(poi => {
          // ? check if it has the field latlng, then check the length
          // ? if it has both, we're including it.
          return poi.latlng && poi.latlng.length === 2
          // return poi.lat && poi.long

        })
        // ? Get data out of response, set in state.
        updatePoi(filteredPoi)
        updateLoading(false)
      })

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


  return <MapGL
    // ? Spread out all my viewport properties into the MapGL component
    // ? as props.
    {...viewPort}
    // ? Event listener for when the viewport changes..
    onViewportChange={(viewPort) => updateViewPort(viewPort)}
    mapboxApiAccessToken={'pk.eyJ1Ijoia2toZXJiIiwiYSI6ImNrbDVjanIycDI2M24yb21zbGYzMGpnM3QifQ.VwrolxjnRnyw3T9JdycZfw'}>

    <div className="filter-container">

      <select onChange={(event) => updateType(event.target.value)} >
        <option>All Points of Interest</option>
        {poiTypes.map((poi, i) => {
          return <option value={poi.value} key={i}>{poi.label}</option>
        })}
      </select>

      <input onChange={(event) => updateSearch(event.target.value)} placeholder="Search..." />

      <div className="button is-success"><Link to='/createPoi'>Add somewhere new!</Link></div>

    </div>

    {filterPoi().map((poi, i) => {
      return <div key={i}>
        <Marker
          key={i}
          latitude={poi.latlng[0]}
          longitude={poi.latlng[1]}
        >

          <div className="map-item"
            onMouseOver={() => updateLabelIsShown(true)}
            onMouseLeave={() => updateLabelIsShown(false)}>
            <div className="map-emoji">📍</div>
            {labelIsShown &&
              <Link to={`poi/${poi._id}`}><div>{poi.name}</div></Link>}
          </div>
        </Marker>
      </div>
    }

    )}
  </MapGL>


}

export default Geography





// BARS
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// // ? import components from my library
// import MapGL, { Marker } from 'react-map-gl'

// const Map = () => {
//   const [bars, updateBars] = useState([])

//   const [viewPort, updateViewPort] = useState({
//     height: '100vh',
//     width: '100vw',
//     zoom: 10.1,
//     latitude: 51.515,
//     longitude: -0.078
//   })

//   useEffect(() => {

//     axios.get('/api/restaurants')
//       .then(resp => {
//         const filteredBars = resp.data.filter(bar => {
//           console.log(bar.lat, 'wooooooooo')
//           // return poi.latlng && poi.latlng.length === 2
//           return bar.lat && bar.long
//         })
//         // ? Get data out of response, set in state.
//         updateBars(filteredBars)

//       })
//   }, [])

//   console.log(bars, 'weeeeeeeeeeee')
//   return <MapGL
//     {...viewPort}
//     onViewportChange={(viewPort) => updateViewPort(viewPort)}
//     mapboxApiAccessToken={'pk.eyJ1Ijoia2toZXJiIiwiYSI6ImNrbDVjanIycDI2M24yb21zbGYzMGpnM3QifQ.VwrolxjnRnyw3T9JdycZfw'}>
//     {bars.map((bar, i) => {
//       return <Marker
//         key={i}
//         latitude={bar.lat}
//         longitude={bar.long}
//       >
//         <img width={20} key={i} src={bar.image} />
//         <p>{bar.name}</p>
//       </Marker>
//     }

//     )}
//   </MapGL>
// }

// export default Map




// import React from 'react'

// const Map = () => {
//   return <h1>testest</h1>

// }

// export default Map