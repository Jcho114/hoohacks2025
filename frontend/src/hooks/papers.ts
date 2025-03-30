import { fetchBfsGraphData, fetchPaperSuggestions } from "@/api/papers";
import { useQuery } from "@tanstack/react-query";

export const usePaperSuggestion = (query: string | null) => {
  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ["papers", "suggestions", "query"],
    queryFn: () => fetchPaperSuggestions(query!),
    enabled: false,
  });

  return {
    suggestionData: data,
    refetchSuggestion: refetch,
    isSuggestionFetching: isFetching,
    suggestionError: error,
  };
};

export const useBfsGraphData = (doi: string | null) => {
  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ["papers", "bfs", "doi"],
    queryFn: () => fetchBfsGraphData(doi!),
    enabled: false,
  });

  return {
    bfsData: data,
    isBfsFetching: isFetching,
    refetchBfs: refetch,
    bfsError: error,
  };
};
