import Paper from './Paper'; 
import {PaperResultType, SearchResultsType} from '../types/types'; 

const SearchResults = ({ search_results, setCurrentPaper, papersToVisualize, setPapersToVisualize }: 
  { search_results: SearchResultsType, setCurrentPaper: (paper: PaperResultType | null) => void, 
    papersToVisualize: SearchResultsType, 
    setPapersToVisualize: (papers: SearchResultsType) => void
  }) => {

  return (
    <div className="search-results">
        {search_results["results"].map((paper : PaperResultType, key : number) => {
            return <Paper paper_information={paper} cancel = {false} setCurrentPaper = {setCurrentPaper} 
            papersToVisualize = {papersToVisualize} setPapersToVisualize = {setPapersToVisualize} key={key}></Paper>
        })}
    </div>
  )
}

export default SearchResults