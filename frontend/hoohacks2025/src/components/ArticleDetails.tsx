import {useState, useEffect} from 'react'; 
import {PaperResultType, SearchResultsType} from "../types/types";

const ArticleDetails = ({currentPaper, papersToVisualize, setPapersToVisualize} : 
                        {currentPaper : PaperResultType | null, 
                         papersToVisualize : SearchResultsType,
                         setPapersToVisualize: (papers: SearchResultsType) => void
                        }) => {

    const [disabled, setDisabled] = useState(false); 

    const handleSelectPaper = () => {
        if (currentPaper !== null) {
            
            const existingResults = papersToVisualize.results;
            const isPaperAlreadySelected = existingResults.some(paper => paper.DOI === currentPaper.DOI);
            
            if (!isPaperAlreadySelected && existingResults.length < 2) {
                existingResults.push(currentPaper);
                setPapersToVisualize({"results": existingResults});
            }

            else {
                // If the paper is already selected, do nothing
                // Or you could choose to replace it or give an alert
                console.log("Paper already selected or maximum limit reached.");
                return;
            }

            console.log("Selected paper added to visualization:", currentPaper);
            console.log("Current papers to visualize:", papersToVisualize);
        }
    }

    useEffect(() => {
        console.log("jiowejfiw"); 
        if (currentPaper !== null) {
            const existingResults = papersToVisualize.results;
            const isPaperAlreadySelected = existingResults.some(paper => paper.DOI === currentPaper.DOI);

            if (existingResults.length >= 2 || isPaperAlreadySelected) {
                console.log("boolean"); 
                setDisabled(true); 
            }
            else {
                setDisabled(false); 
            }
        }
        else {
            console.log("hello"); 
            setDisabled(true); 
        }

    }, [papersToVisualize, currentPaper])

  return (
    
    <div className = "article-details"> 

        {currentPaper === null ? 
            <p>No paper selected</p>
        : 

        <div>
            <div className="article-title">
                <h1>currentPaper.title</h1>
            </div>
            <hr />

            <div className="article-description">
                <p>currentPaper.summary</p>
            </div>
            <div className="article-button">
                <button className={disabled ? "select-button-disabled" : "select-button-show"} onClick = {() => handleSelectPaper()} disabled = {disabled}>Submit</button>
            </div>
        </div>
        }
    </div>

  )
}

export default ArticleDetails