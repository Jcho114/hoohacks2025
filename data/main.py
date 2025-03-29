import duckdb
import requests

CROSSREF_URL = "https://api.crossref.org/works"
PAGE_SIZE = 20


def main():
    conn = duckdb.connect("data.db")
    conn.sql(CREATE_PAPERS_TABLE)
    conn.sql(CREATE_AUTHORS_TABLE)
    conn.sql(CREATE_REFERENCES_TABLE)

    cursor = "*"
    page_url = f"{CROSSREF_URL}?rows={PAGE_SIZE}&cursor={cursor}"
    response = requests.get(page_url)
    message = response.json()["message"]
    cursor = message["next-cursor"]
    items = message["items"]
    for item in items:
        try:
            doi = item["DOI"]
            reference_count = item["reference-count"]
            is_referenced_count = item["is-referenced-by-count"]
            publisher = item["publisher"]
            created_date = item["created"]["date-time"]
            paper_type = item["type"]
            title = item["title"][0]
            url = item["URL"]
            conn.execute(
                INSERT_PAPER,
                [
                    doi,
                    reference_count,
                    is_referenced_count,
                    publisher,
                    created_date,
                    paper_type,
                    title,
                    url,
                ],
            )

            authors = item["author"]
            for author in authors:
                name = author["given"] + " " + author["family"]
                conn.execute(INSERT_AUTHOR, [name])
                conn.execute(INSERT_AUTHORED, [name, doi])

            references = item["reference"]
            for reference in references:
                dest_doi = reference["DOI"]
                if not doi:
                    continue
                conn.execute(INSERT_REFERENCE, [doi, dest_doi])

        except Exception as e:
            print("error with importing item: ", e)


CREATE_PAPERS_TABLE = """
CREATE TABLE IF NOT EXISTS papers (
    doi TEXT PRIMARY KEY,
    reference_count INT,
    is_referenced_count INT,
    publisher TEXT,
    created_date TIMESTAMP,
    type TEXT,
    title TEXT,
    url TEXT
)
"""

CREATE_AUTHORS_TABLE = """
CREATE TABLE IF NOT EXISTS authors (
    name TEXT PRIMARY KEY
)
"""

CREATE_AUTHORED_TABLE = """
CREATE TABLE IF NOT EXISTS authored (
    name TEXT PRIMARY KEY REFERENCES authors(name),
    doi TEXT PRIMARY KEY REFERENCES papers(doi)
)
"""

CREATE_REFERENCES_TABLE = """
CREATE TABLE IF NOT EXISTS references (
    src_doi TEXT PRIMARY KEY REFERENCES papers(doi),
    dest_doi TEXT PRIMARY KEY REFERENCES papers(doi)
)
"""

INSERT_PAPER = """
INSERT INTO papers VALUES (?, ?, ?, ?, ?, ?, ?, ?)
"""

INSERT_AUTHOR = """
INSERT INTO authors VALUES (?)
"""

INSERT_AUTHORED = """
INSERT INTO authored VALUES (?, ?)
"""

INSERT_REFERENCE = """
INSERT INTO references VALUES (?, ?)
"""


if __name__ == "__main__":
    main()
