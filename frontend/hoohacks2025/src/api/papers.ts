import axios from "axios";

export interface PaperType {
  doi: string;
  reference_count: number;
  is_referenced_count: number;
  publisher: string;
  created_date: string;
  type: string;
  title: string;
  url: string;
  summary: string;
}

export const fetchPaperSuggestions = async (
  query: string
): Promise<PaperType[]> => {
  const response = await axios.get(
    `http://localhost:8000/papers/suggestions/${query}`
  );
  return response.data.suggestions;
};

export interface PaperEdgeType {
  src: string;
  dest: string;
}

export interface GraphDataType {
  nodes: PaperType[];
  edges: PaperEdgeType[];
}

export const fetchBfsGraphData = async (doi: string) => {
  const response = await axios.get(
    `http://localhost:8000/papers/bfs?doi=${doi}`
  );
  return response.data;
};
