import React, {useEffect, useState} from 'react';


const VenueItem = (props) => {

  console.log(props)

  return (
    <div>
    {props.venue.name}
    {props.venue.address}
    {props.venue.city_name}
    {props.venue.region_name}
    {props.venue.country_name}

    </div>
  )
}

export default VenueItem
