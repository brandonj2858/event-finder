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

function xml2json(xmlStr) {
let children = [...xmlStr.children];

// base case for recursion.
if (!children.length) {
return xmlStr.innerHTML
}

// initializing object to be returned.
let jsonResult = {};

for (let child of children) {

// checking is child has siblings of same name.
let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

// if child is array, save the values as array, else as strings.
if (childIsArray) {
  if (jsonResult[child.nodeName] === undefined) {
    jsonResult[child.nodeName] = [xml2json(child)];
  } else {
    jsonResult[child.nodeName].push(xml2json(child));
  }
} else {
  jsonResult[child.nodeName] = xml2json(child);
}
}

return jsonResult;
}

  const handleClick = (evt) => {
    const parser = new DOMParser()
    const str = parser.parseFromString(events, "application/xml");
    console.log(xml2json(str));

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
