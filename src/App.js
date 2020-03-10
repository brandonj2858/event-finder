import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [events, setEvents] = useState("")
  const [eventInfo, setEventInfo] = useState("")

  useEffect(() => {

      const xmlInfo = fetch('http://api.eventful.com/rest/events/search?&app_key=4qgTBpXfK99TR8Qk&keywords=books&location=San+Diego&date=Future')
        .then(res => res.text())
        .then(data => setEvents(data))

  }

)

  const handleClick = (evt) => {
    const str = events
    console.log(str)
    const parser = new DOMParser()
    const allEvents = (parser.parseFromString(str, "text/xml").getElementsByTagName('event'))
    setEventInfo(allEvents)
    console.log(eventInfo)

  }



  return (
    <div className="App">
      <div className="navBar">
      <ul className="NavLinksUl">
        <li className="navLinkLI"><a className="navLink" href="#home">Artist</a></li>
        <li className="navLinkLI"><a className="navLink" href="#news">Venue</a></li>
        <li className="navLinkLI"><a className="navLink" href="#contact">Genre</a></li>
        <li className="navLinkLI"><a className="navLink" href="#about">About</a></li>
      </ul>

      </div>
      <div onClick={handleClick} className="mainContainer">


      </div>

    </div>
  );
}

export default App;
