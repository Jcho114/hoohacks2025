import {PaperResultType, SearchResultsType} from "../types/types";
import Paper from './Paper';

const SelectedArticles = ({papersToVisualize, setPapersToVisualize, setCurrentPaper} : 
                        {papersToVisualize: SearchResultsType, 
                         setPapersToVisualize: (papers: SearchResultsType) => void, 
                         setCurrentPaper: (paper: PaperResultType | null) => void
                        }) => 
    
    {
    return (
        <div className="selected-articles">
            <h2 className="selected-articles-title">Selected Papers for Visualization</h2>
            <div>
                {papersToVisualize["results"].map((paper : PaperResultType, key : number) => {
                    return <Paper paper_information={paper} cancel = {true} setCurrentPaper = {setCurrentPaper} 
                    papersToVisualize = {papersToVisualize} setPapersToVisualize = {setPapersToVisualize} key={key}></Paper>
                })}
            </div>
        </div>
    )
}

export default SelectedArticles;