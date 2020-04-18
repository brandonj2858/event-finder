import React, {useEffect, useState} from 'react';


const VenueItem = (props) => {

  console.log(props)

  return (
    <div className="venueInfo">
    <strong>Venue Name</strong>: {props.venue.name}
    <br/>
    <strong>Address</strong>: {props.venue.address} {props.venue.city_name}, {props.venue.region_name}, {props.venue.country_abbr}
    <strong>Upcoming Events</strong>:
    <strong>Venue Link</strong>:

    </div>
  )
}

export default VenueItem
