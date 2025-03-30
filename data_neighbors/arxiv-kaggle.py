import json

with open("arxiv.json", "r", encoding="utf-8") as fin, open(
    "doi-kaggle.txt", "w", encoding="utf-8"
) as fout:
    lines = list(fin)
    total = len(lines)
    count = 0

    for line in lines:
        obj = json.loads(line)
        doi = obj["doi"]
        count += 1
        if doi is None:
            continue
        fout.write(doi + "\n")
        print(f"wrote line {count}/{total}")
