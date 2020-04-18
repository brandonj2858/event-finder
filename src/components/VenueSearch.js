import React, {useEffect, useState} from 'react';
import VenueItem from './VenueItem';



const VenueSearch = () => {
  const [state, setState] = useState({
    cityInput: "",
    venueType: "",
    venuesList: [],
    index: 0,
    selectedVenue: null,
    sortedByEvents: []
  });



  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    })
    console.log(state.venueType);
  }

  const findVenues = (evt) => {
    evt.preventDefault()
    console.log('hello');
    fetch(`http://api.eventful.com/json/venues/search?&app_key=4qgTBpXfK99TR8Qk&location=${state.cityInput}&keywords=${state.venueType}&page_size=460`)
      .then(res => res.json())
      .then(resObj => setState({
        ...state,
        index: 0,
        venuesList: resObj.venues})

      )


  }

  const handleNext = (evt) => {
    evt.preventDefault()
    let prevIndex = state.index
    setState({
      ...state,
      index: prevIndex + 10
    })
    console.log(state.venuesList)
  }

  const handlePrevious = (evt) => {
    evt.preventDefault();
    let prevIndex = state.index;
    setState({
      ...state,
      index: prevIndex - 10
    })

  }

  const handleClick = (evt) => {
    evt.preventDefault();
    console.log(evt.target.id);
    let userChoice = state.venuesList.venue.find((ven) => ven.id === evt.target.id)
    console.log(userChoice);
    setState({
      ...state,
      selectedVenue: userChoice
    })

  }

  const sortByCount = (evt) => {

    let sortedList = state.venuesList.sort((a,b) => {
    return (b.venue.event_count - a.venue.event_count)
    })
    console.log(sortedList)
    setState({
      ...state,
      venuesList: sortedList
    })
  }


  return (
    <div className="venueSearchContainer">
    <div className="">
    <div className="venueSearchArea">
    <strong>Select A City</strong>: <input name="cityInput" onChange={handleChange} value={state.cityInput} type="text"/>
    <br/>
    <strong>Venue Type</strong>: <input type="text" name="venueType" onChange={handleChange} value={state.venueType} />
    <br/>

    <input type="submit" onClick={findVenues}/>
    </div>
    </div>

    <div className="resultsArea">
    <div className="sortingArea">
    <select onChange={sortByCount}>
      <option >Event Count</option>
      <option>A-Z</option>
    </select>
    </div>

    {state.venuesList === [] || state.venuesList.length === 0 ? null : state.venuesList.venue.slice(state.index, state.index + 10).map((ven) => {return <li key={ven.id} id={ven.id} onClick={handleClick} className="resultsList"><strong>Venue Name</strong>: {ven.name} <strong>Venue Location</strong>: {ven.address === null ? "": ven.address + ","} {ven.city_name}, {ven.region_abbr}</li>})}


    <div className="changePageArea">
    {state.venuesList === [] || state.venuesList.length === 0 ? null : state.venuesList.venue.length === undefined || state.index >= 10 ? <button className="prevButton" onClick={handlePrevious} >Previous Page</button> : null }
    {state.venuesList === [] || state.venuesList.length === 0 ? null : state.venuesList.venue.length === undefined || state.index + 11 > state.venuesList.venue.length ? null : <button className="nextButton" onClick={handleNext}>Next Page</button>}
    </div>

    {state.selectedVenue ? <VenueItem venue={state.selectedVenue} /> : null }

    </div>



    </div>


  )



}

export default VenueSearch
