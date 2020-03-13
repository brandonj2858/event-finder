import React, {useState, useEffect} from 'react';



const LocationSearch = () => {

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
    <div>
    {eventInfo === [] || eventInfo.event === undefined ? null : eventInfo.event.map((name) => {return <p>{name.title}</p>})}

    </div>



  )


}

export default LocationSearch
