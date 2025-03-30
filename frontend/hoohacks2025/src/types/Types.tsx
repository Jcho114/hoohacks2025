export interface PaperResultType {
    title: string;
    author: string;
    DOI: string;
    related: Array<string>;
    "date-published": string;
    "reference-count": number;
    summary: string;
}

export interface SearchResultsType {
    "results": Array<PaperResultType>;
}