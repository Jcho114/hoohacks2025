import './App.css'
import {useState} from 'react'; 
import {PaperResultType, SearchResultsType} from './types/types'; 

// Imports
import Graph from './Graph'
import Information from './Information' 

const App = () => {

  const [currentPaper, setCurrentPaper] = useState<PaperResultType | null>((null)); 
  const [papersToVisualize, setPapersToVisualize] = useState<SearchResultsType>({"results": []}); 

  return (
    <div className = "outer-page">
      <div className = "underlay-graph">
        <Graph></Graph>
      </div>
      <div className = "overlay-information">
        <Information  currentPaper = {currentPaper}
                      setCurrentPaper = {setCurrentPaper}
                      papersToVisualize = {papersToVisualize}
                      setPapersToVisualize = {setPapersToVisualize}></Information>
      </div>
    </div>
  )
}

export default App
