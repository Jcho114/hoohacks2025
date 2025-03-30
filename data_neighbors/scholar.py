import requests
from bs4 import BeautifulSoup
import random
import time
import re 
from headers import generate_headers


URL = "https://scholar.google.com/scholar?q="


def main():
    dois = None
    file_name = "YOLO"

    with open(f"./{file_name}", "r", encoding="utf-8") as f:
        dois = f.readlines()

    for doi in dois:
        req = requests.get(URL + doi, headers=generate_headers())
        code = req.status_code

        if code == 200:
            soup = BeautifulSoup(req.content, "html.parser")

            divs = soup.find_all('div')
            fresh_divs = []

            for div in divs:
                if 'class' in div.attrs:
                    if 'gs_rs gs_fma_s' in div.attrs['class']:
                        fresh_divs.append(div)

                    if 'gs_rs' in div.attrs['class']:
                        fresh_divs.append(div)
            
            summary = ""

            if len(fresh_divs) > 0:
                for summ_part in fresh_divs[0]:
                    summary += re.sub(r"<.+>", " ", str(summ_part)).strip() + " "
                
                summary = summary.strip()
            else:
                summary = "Summary not found."
            
            with open(f"./{file_name}_summary", "a", encoding="utf-8", errors="ignore") as f:
                f.write(summary + "\n")
            
            print(summary)
        else:
            print(f"Status code: {code}")
        
        # RAnd delay
        time.sleep(2.75 * random.random())

if __name__ == "__main__":
    main()