export interface PaperResultType {
  title: string;
  author: string;
  DOI: string;
  related: Array<string>;
  date_published: string;
  reference_count: number;
  summary: string;
}

export interface SearchResultsType {
  results: Array<PaperResultType>;
}
