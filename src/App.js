import  { useState, useEffect, useRef } from 'react'
import { useOnClickOutside } from './hooks';

// Component Imports
import Map from './components/Map'
import Loader from './components/Loader'
import Header from './components/Header'
import Menu from './components/Menu'

function App() {
  //Loading and Data state
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

  //Button state
  const [wildfires, setWildfires] = useState(true)
  const [storms, setStorms] = useState(true)
  const [volcanos, setVolcanos] = useState(false)

  //Menu & MarkerInfo state
  const [open, setOpen] = useState(false)
  const node = useRef(); 
  useOnClickOutside(node, () => setOpen(false));

  // Fetch data & set loading
  const [errorState, setErrorState] = useState(false)

  useEffect(() => { 
    const axios = require('axios');
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const res = await axios.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events');
        const { events } = await res.data

        setEventData(events)
        setLoading(false)

      } catch (error) {
        console.error(`${error}: There has been a problem fetching data,`);
        setErrorState(true)
      }
    }
    fetchEvents()
  }, [])
  

  return (
    <div className="App">
      <div ref={node}> 
      <Header 
        wildfires={wildfires}
        storms={storms}
        volcanos={volcanos}
        setWildfires={setWildfires}
        setStorms={setStorms}
        setVolcanos={setVolcanos}
        open={open}
        setOpen={setOpen}
      />
  
      <Menu
        open={open}
        setOpen={setOpen}
       />
    </div>
      { !loading ? <Map 
        eventData={eventData} 
        wildfires={wildfires}
        storms={storms}
        volcanos={volcanos}
      /> : <Loader errorState={errorState} />}
    </div>
  );
}

export default App;

