import React, {useState, useEffect} from 'react';



const LocationSearch = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [eventInput, setEventInput] = useState('');
  const [totalPages, setTotalPages] = useState('')
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
      //just a search used for practice
      console.log('hello');


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


  const handleSubmit = (evt) => {
    evt.preventDefault();
    setPageCount(1)
    const parser = new DOMParser()
    console.log(cityInput, eventInput)
    const xmlInfo = fetch(`http://api.eventful.com/rest/events/search?&app_key=4qgTBpXfK99TR8Qk&keywords=${eventInput}&location=${cityInput}&date=Future&sort_order=date&page_size=10`)
      .then(res => res.text())
      .then(data => parser.parseFromString(data, 'application/xml'))
      .then(obj => {
        let data = xml2json(obj);
        let eventsObj = data.search.events
        console.log(data.search);
        setTotalPages(data.search.page_count)
        setEventInfo(eventsObj)
      })



  }

  const nextPage = (evt) => {
    evt.preventDefault();
    let newCount = pageCount + 1
    setPageCount(newCount)
    const parser = new DOMParser()
    const xmlInfo = fetch(`http://api.eventful.com/rest/events/search?&app_key=4qgTBpXfK99TR8Qk&keywords=${eventInput}&location=${cityInput}&date=Future&sort_order=date&page_number=${pageCount + 1}`)
      .then(res => res.text())
      .then(data => parser.parseFromString(data, 'application/xml'))
      .then(obj => {
        let data = xml2json(obj);
        let eventsObj = data.search.events
        console.log(data.search);

        setEventInfo(eventsObj)
      })


  }





  return (
    <div>
    <div className="searchContainer">

    <form onSubmit={handleSubmit}>

      <input type="text" onChange={(evt) => setCityInput(evt.target.value)} placeholder="City"/>
      <br/>
      <br/>
      <input type="text" onChange={(evt) => setEventInput(evt.target.value)} placeholder="Event"/>
      <br/>
      <input type="submit"/>

    </form>

    </div>

    <div className="resultsContainer">
    {eventInfo === [] || eventInfo.event === undefined ? null : eventInfo.event.map((name) => {return <li className="resultsList">{name.title}</li>})}
    {eventInfo === [] || pageCount >= totalPages ? null : <button onClick={nextPage} type="submit">Next Page</button>}
    </div>


    </div>



  )


}

export default LocationSearch
