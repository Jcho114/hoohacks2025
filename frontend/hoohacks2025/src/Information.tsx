import ArticleDetails from './components/ArticleDetails'
import SearchResults from './components/SearchResults'
import SelectedArticles from './components/SelectedArticles'
import './Information.css'

import {PaperResultType, SearchResultsType} from './types/types';

const Information = () => {

    // Function to handle search submission
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchInput = event.currentTarget.elements[0] as HTMLInputElement;
        const query = searchInput.value;
        
        // Perform search logic here using the query
        console.log("Search submitted for:", query);
    }

    // Sample Search Query Returned Object
    const sampleSearchResults = {
        "results": [
          {
            "title": "first title",
            "author": "first author",
            "DOI": "1",
            "related": [
      
            ],
      
            "date-published": "first published",
            "reference-count": 1,
            "summary": "first summary"
          },
          {
            "title": "second title",
            "author": "second author",
            "DOI": "2",
            "related": [
      
            ],
      
            "date-published": "second published",
            "reference-count": 2,
            "summary": "second summary"
          },
          {
            "title": "third title",
            "author": "third author",
            "DOI": "3",
            "related": [
      
            ],
      
            "date-published": "third-published",
            "reference-count": 3,
            "summary": "third summary"
          },
          {
            "title": "Fourth paper",
            "author": "fourth-author",
            "DOI": "4",
            "related": [
      
            ],
      
            "date-published": "fourth",
            "reference-count": 4,
            "summary": "fourth"
          }
        ]
      }

  return (
    <div className = "information">
        <div className = "panel-left">
            <p className = "title">Research Wizard</p>
            
            <form onSubmit = {handleSearchSubmit} className = "search">
                <input className = "" placeholder = "enter keywords, doi, or url..."></input>
            </form>

            <SearchResults search_results = {sampleSearchResults}></SearchResults>
            <ArticleDetails></ArticleDetails>
        </div>

        <div className="panel-right"> 
			<SelectedArticles></SelectedArticles>
        </div>
    </div>
  )
}

export default Information