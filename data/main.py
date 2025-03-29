import traceback

import duckdb
import requests

CROSSREF_URL = "https://api.crossref.org/works"
PAGE_SIZE = 20


def main():
    conn = duckdb.connect("data.db")
    conn.sql(CREATE_PAPERS_TABLE)
    conn.sql(CREATE_AUTHORS_TABLE)
    conn.sql(CREATE_AUTHORED_TABLE)
    conn.sql(CREATE_PAPER_REFERENCES_TABLE)

    cursor = "*"
    total_count = 0
    page_count = 0

    while True:
        page_url = f"{CROSSREF_URL}?rows={PAGE_SIZE}&cursor={cursor}"
        response = requests.get(page_url)
        message = response.json()["message"]
        cursor = message["next-cursor"]
        items = message["items"]
        error_count = 0
        for item in items:
            try:
                conn.execute("BEGIN;")
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

                if "author" in item:
                    authors = item["author"]
                    for author in authors:
                        given = author["given"] if "given" in author else ""
                        family = author["family"] if "family" in author else ""
                        name = " ".join([given, family])
                        if name:
                            conn.execute(INSERT_AUTHOR, [name])
                            conn.execute(INSERT_AUTHORED, [name, doi])

                if "reference" in item:
                    references = item["reference"]
                    for reference in references:
                        if "DOI" not in reference:
                            continue
                        dest_doi = reference["DOI"]
                        conn.execute(INSERT_REFERENCE, [doi, dest_doi])

                conn.execute("COMMIT;")

            except Exception:
                conn.execute("ROLLBACK;")
                error_count += 1
                print("error with importing item:")
                print(traceback.format_exc())

        total_count += PAGE_SIZE - error_count
        page_count += 1
        print(f"processed a total of {page_count} pages")
        print(f"processed a total of {total_count} items")
        print(f"{error_count}/{PAGE_SIZE} items failed to import")


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
    name TEXT REFERENCES authors(name),
    doi TEXT REFERENCES papers(doi),
    PRIMARY KEY (name, doi)
)
"""

# do not add foreign key to dest_doi yet
CREATE_PAPER_REFERENCES_TABLE = """
CREATE TABLE IF NOT EXISTS paper_references (
    src_doi TEXT REFERENCES papers(doi),
    dest_doi TEXT,
    PRIMARY KEY (src_doi, dest_doi)
)
"""

INSERT_PAPER = """
INSERT INTO papers VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING
"""

INSERT_AUTHOR = """
INSERT INTO authors VALUES (?) ON CONFLICT DO NOTHING
"""

INSERT_AUTHORED = """
INSERT INTO authored VALUES (?, ?) ON CONFLICT DO NOTHING
"""

INSERT_REFERENCE = """
INSERT INTO paper_references VALUES (?, ?) ON CONFLICT DO NOTHING
"""


if __name__ == "__main__":
    main()
