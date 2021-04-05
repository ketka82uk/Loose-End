import axios from 'axios'

export default function getMeetUpData(users, poi, restaurants) {
  return [
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2022-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://southbanklondon.com/sites/default/files/2019-05/walk.png"
    },
    {
      name: "Share a walk along the river?",
      location: "london",
      date: new Date("2022-02-27"),
      time: "14:00",
      description: "I have a couple of hours to kill next Sunday after an appointment in London, who's up for a chat whilst walking along the river? Definitely get in touch if you can talk to me about MERN stacks all day!",
      tags: ["walking"],
      poiSuggestions: [poi[0]._id, poi[1]._id],
      isActive: true,
      creator: users[1]._id,
      image: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/london-areas/river-thames/london-tower-bridge.jpg?mw=640&hash=4C223C699EB1A2C22FDD14514A784D0DB275AC64"
    },
    {
      name: "Looking for a foodie to try out Dishoom next weekend",
      location: "kings cross",
      date: new Date("2022-02-27"),
      time: "17:00",
      description: "My friend had to cancel on our dinner plans last minute due to a family emergency. I have a table for two booked at Dishoom Kings Cross on Sunday and I feel awkward eating out alone, so some company would be great! I'm told it's the best curry in London...",
      tags: ["restaurants"],
      restaurantSuggestions: [restaurants[1]._id],
      isActive: true,
      creator: users[2]._id,
      image: "https://f3e6t7k9.stackpathcdn.com/wp-content/uploads/2020/06/dishoom-loti.jpg"
    },
    {
      name: "New exhibition at the V&A?",
      location: "london",
      date: new Date("2022-03-02"),
      time: "15:00",
      description: "I am planning a trip to the V&A museum next week as part of my short stay in London. Their new exhibition on the Persian Empire looks Amazing! would love to go see it with a fellow persophile.",
      tags: ["culture"],
      poiSuggestions: [poi[1]._id],
      isActive: true,
      creator: users[3]._id,
      image: "https://media.timeout.com/images/101634025/630/472/image.jpg"
    },
    {
      name: "At a loose end for a few hours next week, up for suggestions",
      location: "london",
      date: new Date("2022-03-03"),
      time: "17:00",
      description: "I have two very annoyingly spaced apart meetings in London next wednesday, I'd love to make the most of the time and explore the city a bit with someone in a similar situation. I honestly enjoy a bit of everything, so hit me up with suggestions!",
      tags: ["restaurants", "tours", "culture", "walking"],
      restaurantSuggestions: [restaurants[0]._id, restaurants[1]._id],
      poiSuggestions: [poi[0]._id, poi[1]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://london.ac.uk/sites/default/files/styles/max_1300x1300/public/2018-10/london-aerial-cityscape-river-thames_1.jpg?itok=6LenFxuz"
    }
  ]
}