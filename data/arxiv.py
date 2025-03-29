import requests
import xmltodict

ARXIV_URL = "https://export.arxiv.org/api/query"
PAGE_SIZE = 100


def main():
    curr_page = 0
    with open("dois.txt", "w", encoding="utf-8") as f:
        while True:
            response = requests.get(
                f"{ARXIV_URL}?search_query=all&start={curr_page*PAGE_SIZE}&max_results={PAGE_SIZE}"
            )
            curr_page += 1
            xml = xmltodict.parse(response.text)

            feed = xml["feed"]
            if "entry" not in feed:
                break

            entries = feed["entry"]
            for entry in entries:
                if "arxiv:doi" in entry:
                    doi = entry["arxiv:doi"]["#text"]
                    f.write(doi + "\n")

            print(f"processed {curr_page} pages")


if __name__ == "__main__":
    main()
