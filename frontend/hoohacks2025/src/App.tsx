import './App.css'

// Imports
import Graph from './Graph'
import Information from './Information' 

const App = () => {

  return (
    <div className = "outer-page">
      <div className = "underlay-graph">
        <Graph></Graph>
      </div>
      <div className = "overlay-information">
        <Information></Information>
      </div>
    </div>
  )
}

export default App
