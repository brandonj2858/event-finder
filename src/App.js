import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [searchResults, setSearchResults] = useState([])
  const [eventInfo, setEventInfo] = useState([])

  useEffect(() => {
      const parser = new DOMParser()
      const xmlInfo = fetch('http://api.eventful.com/rest/events/search?&app_key=4qgTBpXfK99TR8Qk&keywords=books&location=San+Diego&date=Future')
        .then(res => res.text())
        .then(data => parser.parseFromString(data, "application/xml"))
        .then(obj => {
          let data = xml2json(obj);
          let eventsObj = data.search.events
          setEventInfo(eventsObj);
        });


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

/*
  const handleClick = (evt) => {
    const parser = new DOMParser()
    const str = parser.parseFromString(searchResults, "application/xml");
    let newObj = xml2json(str);
    console.log(newObj);
    setEventInfo(newObj.search.events);
    console.log(eventInfo)



  }*/




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
      <div  className="mainContainer">
      {eventInfo === [] || eventInfo.event === undefined ? null : eventInfo.event.map((name) => {return <p>{name.title}</p>})}

      </div>

      <div>

      </div>

    </div>
  );
}

export default App;
