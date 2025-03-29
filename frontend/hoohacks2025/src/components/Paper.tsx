import { useState } from "react"
import {PaperResultType} from "../types/types";

const Paper = ({ paper_information }: { paper_information: PaperResultType }) => {

    // State to hold the information for the paper
    const [currentPaper, setPaper] = useState(0); 

  return (
    <div>
        <div className="paper-card">
            <h2 className="paper-title">{paper_information.title}</h2>
            <p className="paper-author">Author: {paper_information.author}</p>
            <p className="paper-date">Published Date: {paper_information["date-published"]}</p>
            <p className="paper-reference-count">Reference Count: {paper_information["reference-count"]}</p>
            <p className="paper-summary">Summary: {paper_information.summary}</p>
            <p className="paper-doi">DOI: {paper_information.DOI}</p>
        </div>
    </div>
  )
}

export default Paper