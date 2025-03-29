import requests
import xmltodict

ARXIV_URL = "https://export.arxiv.org/api/query"
PAGE_SIZE = 100
MAX_RETRIES = 40


def main():
    curr_page = 0
    retries = 0
    with open("dois.txt", "w", encoding="utf-8") as f:
        while True:
            response = requests.get(
                f"{ARXIV_URL}?search_query=all&start={curr_page*PAGE_SIZE}&max_results={PAGE_SIZE}"
            )
            xml = xmltodict.parse(response.text)

            feed = xml["feed"]
            if int(feed["opensearch:totalResults"]["#text"]) < PAGE_SIZE * curr_page:
                break

            if "entry" not in feed:
                if retries < MAX_RETRIES:
                    retries += 1
                    print(
                        f"page {curr_page+1} did not return data, retrying ({retries}/{MAX_RETRIES})"
                    )
                else:
                    print(
                        f"page {curr_page+1} failed to return valid data, moving to next page"
                    )
                    retries = 0
                    curr_page += 1
                continue

            retries = 0
            curr_page += 1
            entries = feed["entry"]
            for entry in entries:
                if "arxiv:doi" in entry:
                    doi = entry["arxiv:doi"]["#text"]
                    f.write(doi + "\n")

            print(f"processed {curr_page} pages")


if __name__ == "__main__":
    main()
