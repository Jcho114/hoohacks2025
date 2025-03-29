import Paper from './Paper'; 
import {PaperResultType, SearchResultsType} from '../types/types'; 

const SearchResults = ({ search_results }: { search_results: SearchResultsType }) => {
  return (
    <div className="search-results">
        {search_results["results"].map((paper : PaperResultType, key : number) => {
            return <Paper paper_information={paper} key={key}></Paper>
        })}
    </div>
  )
}

export default SearchResults