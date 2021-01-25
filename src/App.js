import React from 'react'
import Header from './Components/Header'
import MapContainer from './Components/MapContainer'
import Data from './Components/Data'
import TwitterContainer from './Components/TwitterContainer'
import NewsContainer from './Components/NewsContainer'

function App() {
  return (
    <div className="App">
      <Header />
      <MapContainer />
      <Data />
      <TwitterContainer />
      <NewsContainer />
    </div>
  );
}

export default App;
