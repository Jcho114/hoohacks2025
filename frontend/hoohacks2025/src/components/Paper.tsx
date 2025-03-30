import { useState } from "react"
import {PaperResultType} from "../types/types";

const Paper = ( { paper_information, cancel, setCurrentPaper, papersToVisualize, setPapersToVisualize }: 
                { paper_information: PaperResultType; cancel: boolean, setCurrentPaper: (paper: PaperResultType | null) => void, 
                  papersToVisualize: {results: PaperResultType[]},
                  setPapersToVisualize: (papers: {results: PaperResultType[]}) => void
                }) => {

  const removePapersFromVisualization = (cancelledPaper : PaperResultType) => {
    const resultsArray = []; 

    if (papersToVisualize.results !== null) {
      for (let i = 0; i < papersToVisualize.results.length; i++) {
        if (cancelledPaper.DOI !== papersToVisualize["results"][i].DOI) {
          resultsArray.push(papersToVisualize.results[i]);
        }
      }
    }

    setPapersToVisualize({"results": resultsArray}); 
  }

  return (

    <div>
        {cancel ? 

                <div>
                    <div className="paper-card" onClick = {() => setCurrentPaper(paper_information)}>
                        <h2 className="paper-title">{paper_information.title}</h2>
                        <p className="paper-author">Author: {paper_information.author}</p>
                        <p className="paper-date">Published Date: {paper_information["date-published"]}</p>
                        <p className="paper-reference-count">Reference Count: {paper_information["reference-count"]}</p>
                        <p className="paper-summary">Summary: {paper_information.summary}</p>
                        <p className="paper-doi">DOI: {paper_information.DOI}</p>
                    </div>
                    {/* Add a cancel button or functionality here if needed */}
                    <button className="cancel-button" onClick={() => removePapersFromVisualization(paper_information)}>Cancel</button>
                </div>
                
                : 

                <div className="paper-card" onClick = {() => setCurrentPaper(paper_information)}>
                    <h2 className="paper-title">{paper_information.title}</h2>
                    <p className="paper-author">Author: {paper_information.author}</p>
                    <p className="paper-date">Published Date: {paper_information["date-published"]}</p>
                    <p className="paper-reference-count">Reference Count: {paper_information["reference-count"]}</p>
                    <p className="paper-summary">Summary: {paper_information.summary}</p>
                    <p className="paper-doi">DOI: {paper_information.DOI}</p>
                </div> 
        }

    </div>
  )
}

export default Paper