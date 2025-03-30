import json

with open("arxiv.json", "r", encoding="utf-8") as fin, open(
    "doi-kaggle.txt", "w", encoding="utf-8"
) as fout:
    lines = list(fin)
    total = len(lines)
    count = 0

    numWithoutIdentifier = 0

    for line in lines:
        obj = json.loads(line)
        doi = obj["doi"]
        title = obj["title"]

        if doi is None: 
            continue
        else: 
            
        
        count += 1

        fout.write(doi + "\n")
        # print(f"wrote line {count}/{total}")
    print("Number without DOI / Number of Papers: " + str(numWithoutIdentifier) + " / " + str(count))