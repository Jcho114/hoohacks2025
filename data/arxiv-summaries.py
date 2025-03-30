import sqlite3
import json

UPDATE_QUERY = """
UPDATE papers SET summary = ? WHERE doi = ?
"""

with (
    open("arxiv.json", "r", encoding="utf-8") as fin,
):
    lines = list(fin)
    total = len(lines)
    count = 0

    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    for line in lines:
        obj = json.loads(line)
        doi = obj["doi"]
        summary = "'" + obj["abstract"] + "'"

        cursor.execute(UPDATE_QUERY, [summary, doi])

        count += 1
        if doi is None:
            continue
        print(f"imported summary for line {count}/{total}")

    conn.commit()
    conn.close()
