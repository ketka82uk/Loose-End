import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/Register.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import About from './components/About.js'
import Profile from './components/Profile.js'
import UpdateProfile from './components/UpdateProfile.js'
// import Inbox from './components/Inbox.js'
import MeetUp from './components/MeetUp.js'
import SingleMeetUp from './components/SingleMeetUp.js'
import CreateMeetUp from './components/CreateMeetUp.js'
import UpdateMeetUp from './components/UpdateMeetUp.js'
import Activities from './components/Activities.js'
import SingleActivity from './components/SingleActivity.js'
import Restaurants from './components/Restaurants.js'
import SingleRestaurant from './components/SingleRestaurant.js'
import UpdateRestaurant from './components/UpdateRestaurant.js'
import CreateRestaurant from './components/CreateRestaurant.js'
import Poi from './components/Poi.js'
import SinglePoiMap from './components/SinglePoiMap.js'
import CreatePoi from './components/CreatePoi.js'
import UpdatePoi from './components/UpdatePoi.js'
import Groups from './components/Groups.js'
import SingleGroup from './components/SingleGroup.js'
import CreateGroup from './components/CreateGroup.js'
import UpdateGroup from './components/UpdateGroup.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
// NEW
import MeetUpSearch from './components/MeetUpSearch.js'
import ImageUpload from './components/ImageUpload.js'
import Geography from './components/Map.js'
import Geography2 from './components/MapFD.js'

import './styles/ollieStyle.scss'
import 'bulma'
import './styles/style.scss'


const App = () => {
  return <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path="/about" component={About}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/profile/:profileId" component={Profile}/>
      <Route exact path="/updateProfile/:profileId" component={UpdateProfile}/>
      {/* <Route exact path="/inbox" component={Inbox}/> */}
      <Route exact path="/meetUp" component={MeetUp}/>
      <Route exact path="/meetUp/:meetUpId" component={SingleMeetUp}/>
      <Route exact path="/createMeetUp" component={CreateMeetUp}/>
      <Route exact path="/updateMeetUp/:meetUpId" component={UpdateMeetUp}/>
      <Route exact path="/activities" component={Activities}/>
      <Route exact path="/singleActivity" component={SingleActivity}/>
      <Route exact path="/activities/food-and-drink" component={Restaurants}/>
      <Route exact path="/activities/create-restaurant" component={CreateRestaurant}/>
      <Route exact path="/activities/update-restaurant/:restaurantId" component={UpdateRestaurant}/>
      <Route exact path="/activities/:restaurantId" component={SingleRestaurant}/>
      <Route exact path="/poi" component={Poi}/>
      <Route exact path="/poi/:poiId" component={SinglePoiMap}/>
      <Route exact path="/createPoi" component={CreatePoi}/>
      <Route exact path="/updatePoi/:poiId" component={UpdatePoi}/>
      <Route exact path="/groups" component={Groups}/>
      <Route exact path="/groups/create-group" component={CreateGroup}/>
      <Route exact path="/groups/update-group/:groupId" component={UpdateGroup}/>
      <Route exact path="/groups/:groupId" component={SingleGroup}/>
      <Route exact path="/updateGroup" component={UpdateGroup}/>
      {/* NEW */}
      <Route exact path="/meetUpSearch" component={MeetUpSearch}/>
      <Route exact path="/upload-image" component={ImageUpload}/>
      <Route exact path="/map" component={Geography}/>
      <Route exact path="/map/fd" component={Geography2}/>

    </Switch>
    <Footer />
  </BrowserRouter>
}

export default App