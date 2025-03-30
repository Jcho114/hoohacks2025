import { useState, useEffect } from "react";
import { PaperResultType, SearchResultsType } from "../types/types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ArticleDetails = ({
  currentPaper,
  papersToVisualize,
  setPapersToVisualize,
}: {
  currentPaper: PaperResultType | null;
  papersToVisualize: SearchResultsType;
  setPapersToVisualize: (papers: SearchResultsType) => void;
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleSelectPaper = () => {
    if (currentPaper !== null) {
      const existingResults = papersToVisualize.results;
      const isPaperAlreadySelected = existingResults.some(
        (paper) => paper.DOI === currentPaper.DOI
      );

      if (!isPaperAlreadySelected && existingResults.length < 2) {
        existingResults.push(currentPaper);
        setPapersToVisualize({ results: existingResults });
      } else {
        // If the paper is already selected, do nothing
        // Or you could choose to replace it or give an alert
        console.log("Paper already selected or maximum limit reached.");
        return;
      }

      console.log("Selected paper added to visualization:", currentPaper);
      console.log("Current papers to visualize:", papersToVisualize);
    }
  };

  useEffect(() => {
    console.log("jiowejfiw");
    if (currentPaper !== null) {
      const existingResults = papersToVisualize.results;
      const isPaperAlreadySelected = existingResults.some(
        (paper) => paper.DOI === currentPaper.DOI
      );

      if (existingResults.length >= 2 || isPaperAlreadySelected) {
        console.log("boolean");
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      console.log("hello");
      setDisabled(true);
    }
  }, [papersToVisualize, currentPaper]);

  return (
    <Card className="flex w-full flex-1 flex-col gap-0 p-4 text-black rounded-sm">
      <h1 className="text-md font-bold">
        {currentPaper === null ? "Article Details" : currentPaper.title}
      </h1>
      <Separator className="bg-black my-1 rounded-sm" />
      {currentPaper === null ? (
        <p>No paper selected</p>
      ) : (
        <div className="flex w-full h-full flex-col justify-between">
          <div className="text-md">
            <p>{currentPaper.summary}</p>
          </div>
          <Button
            className={cn(
              "text-sm border-black border-1 cursor-pointer",
              disabled ? "select-button-disabled" : "select-button-show"
            )}
            onClick={() => handleSelectPaper()}
            disabled={disabled}
          >
            Submit
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ArticleDetails;
