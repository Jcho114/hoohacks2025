from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_SUGGESTIONS = 10

AUTOCOMPLETE_QUERY = f"""
SELECT * FROM papers
WHERE doi LIKE ?
OR title LIKE ?
ORDER BY is_referenced_count DESC
LIMIT {MAX_SUGGESTIONS}
"""


@app.get("/papers/suggestions/{query}")
def papers_search(query: str):
    conn = sqlite3.connect("../data/data.db")
    search_term = f"%{query}%"
    cursor = conn.execute(AUTOCOMPLETE_QUERY, [search_term, search_term])
    rows = cursor.fetchall()
    suggestions = []
    for row in rows:
        suggestion = {
            "doi": row[0],
            "reference_count": row[1],
            "is_referenced_count": row[2],
            "publisher": row[3],
            "created_date": row[4],
            "type": row[5],
            "title": row[6],
            "url": row[7],
        }
        suggestions.append(suggestion)
    return {"suggestions": suggestions}


NODES_QUERY = """
WITH RECURSIVE citation_chain AS (
    SELECT src_doi, dest_doi, 1 AS depth
    FROM paper_references
    WHERE src_doi = ?

    UNION ALL

    SELECT pr.src_doi, pr.dest_doi, cc.depth + 1
    FROM paper_references pr
    INNER JOIN citation_chain cc ON pr.src_doi = cc.dest_doi
    WHERE cc.depth < ?
),
node_distances AS (
    SELECT src_doi AS doi, depth AS distance
    FROM citation_chain
    UNION
    SELECT dest_doi AS doi, depth AS distance
    FROM citation_chain
),
unique_node_distances AS (
    SELECT doi, MIN(distance) AS distance
    FROM node_distances
    GROUP BY doi
)
SELECT p.*, und.distance
FROM papers p
JOIN unique_node_distances und ON p.doi = und.doi
WHERE p.doi IN (SELECT doi FROM unique_node_distances)
ORDER BY und.distance
"""


@app.get("/papers/bfs")
def papers_bfs(doi: str):
    conn = sqlite3.connect("../data/data.db")

    cursor = conn.execute(NODES_QUERY, [doi, 4])
    rows = cursor.fetchall()
    nodes = []
    dois = []
    for row in rows:
        node = {
            "doi": row[0],
            "reference_count": row[1],
            "is_referenced_count": row[2],
            "publisher": row[3],
            "created_date": row[4],
            "type": row[5],
            "title": row[6],
            "url": row[7],
            "distance": row[8] if row[0] != doi else 0,
        }
        if row[0] == doi:
            nodes.insert(0, node)
            dois.insert(0, row[0])
        else:
            nodes.append(node)
            dois.append(row[0])

    placeholders = ", ".join("?" * len(dois))
    EDGES_QUERY = f"""
    SELECT src_doi, dest_doi FROM paper_references WHERE src_doi IN ({placeholders}) AND
    dest_doi IN ({placeholders})
    """

    params = dois + dois
    cursor = conn.execute(EDGES_QUERY, params)
    rows = cursor.fetchall()
    edges = []
    for row in rows:
        edge = {"src": row[0], "dest": row[1]}
        edges.append(edge)

    return {"nodes": nodes, "edges": edges}
