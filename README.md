# Paper Trail

## Inspiration

We were inspired by a YouTube video we saw that mapped out Wikipedia and drew connections between different pages. Exploring this idea further, we wondered how could we utilize mapping and search algorithms to help people in education. While brainstorming ideas, we thought of Paper Trail and pursued it since finding the right research papers can be difficult and time-consuming.

## What it does

Paper Trail is an educational visualization tool that students and professors can utilize to quickly find new research papers and the connections between related papers. Users can search for papers of interest, and get useful information about them, including DOIs (document object identifiers), authors, and abstracts. Furthermore, a user is able to visualize which papers are related to one another based off of citations and a similarity heuristic, allowing them to discover literature specific to their niche. 

Another key feature we developed is our paper ranking and search algorithm, which ranks papers by their relevance to a search item based on its indegree in the literature space. In addition, by focusing on optimizing read and write times in our database representation, we are able to maintain efficiency given over 550,000 records. 

Enter a search query, double-click on the paper you want more information about, and follow the trail!

## How we built it

We collected data using Crossref and arXiv (two API endpoints for gathering information about published literature) and stored this data in a local SQLite3 database. We then built a FastAPI Python script to host endpoints that we can request to collect the data we want (based on queries from the front end). Additionally on the backend, we worked on our paper ranking and search algorithm, which works to retrieve the most relevant papers for a queried term. 

On our front end, we utilized React and the React-Flow library in order to dynamically update our graph visualization. We also utilize a tree structure in order to represent the cited vs. cited by relationship between nodes. Our front end was focused on creating a simple and effective user interface that would be straightforward for professors, but especially for students, to get started with. 


## Challenges we ran into

The majority of our challenges were related to data collection and unreliable API endpoints. Many research papers use a value called the DOI (document object identifier) in order to uniquely identify them. However, we found early on that many papers forgo using this identifier, and that different sites use different schemes for identifying papers. For example, ArXiv does not provide citations to other papers and does not use DOIs, while Crossref does. This caused us to limit our paper collection to papers that were from ArXiv, but queryable from CrossRef. This led to some discrepancies in DOIs and the number of papers that cited a certain paper 


## Accomplishments that we're proud of

We are proud of our creative solutions that we used to overcome our challenges with data. We discovered arXiv's unreliable DOI tagging and difficulty in getting citations from their pages. After consulting with each other, we decided that the time commitment for accurately parsing PDFs would be too costly for the payoff, so we decided to put more focus into other categories like data processing and formatting. We are also happy with how efficiently our backend communicated with our frontend, delivering all of smooth updates and real-time responsiveness, enhancing the overall user experience.

## What we learned

We learned how to handle large (on the scale of millions of records) datasets, and deal with unclean data sources. We also worked to develop efficient algorithms to minimize time to create our visualizations using shortest path search algorithms, and create ranking heuristics to describe papers. 

## What's next for Paper Trail

We are very excited to keep working on Paper Trial going forward. The most interesting new feature – that we were not able to finish given the time constraints – was an implementation of the shortest path algorithm to find the connections between two selected papers. Our plan here would be that two papers, which may not even be in the same field or subject, could be connected through some minimal number of cited papers. This would provide researchers and students with a way to “fill in the blank” between how two topics are connected. 

Because classic search algorithms are awfully inefficient on datasets of hundreds of millions of records, we experimented with the idea of clustering papers into communities, and using those clusters to better find paths between farther papers. This would be done using natural language processing and document clustering, and could also play into our visualization by allowing our system to automatically find emerging subfields within the literature. 
