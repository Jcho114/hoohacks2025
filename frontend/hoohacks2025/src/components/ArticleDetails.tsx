import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PaperType } from "@/api/papers";

const ArticleDetails = ({
  refetchBfs,
  currentPaper,
  papersToVisualize,
  setPapersToVisualize,
}: {
  refetchBfs: () => void;
  currentPaper: PaperType | null;
  papersToVisualize: PaperType[];
  setPapersToVisualize: (papers: PaperType[]) => void;
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleSelectPaper = () => {
    if (currentPaper === null) {
      return;
    }

    if (papersToVisualize.length === 1) {
      return;
    }

    if (papersToVisualize.some((paper) => paper.doi === currentPaper.doi)) {
      return;
    }

    setPapersToVisualize([...papersToVisualize, currentPaper]);
    refetchBfs();
  };

  useEffect(() => {
    if (currentPaper !== null) {
      const existingResults = papersToVisualize;
      const isPaperAlreadySelected = existingResults.some(
        (paper) => paper.doi === currentPaper.doi
      );

      if (existingResults.length >= 1 || isPaperAlreadySelected) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  }, [papersToVisualize, currentPaper]);

  return (
    <Card className="flex w-full flex-1 flex-col gap-0 p-4 text-black rounded-sm">
      <h1 className="text-md font-bold">
        {currentPaper === null
          ? "Article Details"
          : currentPaper.title.length > 45
          ? currentPaper.title.substring(0, 45) + "..."
          : currentPaper.title}
      </h1>
      <Separator className="bg-black my-1 rounded-sm" />
      {currentPaper === null ? (
        <p>No paper selected</p>
      ) : (
        <div className="flex w-full h-full flex-col justify-between">
          <div className="text-md">{/* <p>{currentPaper.summary}</p> */}</div>
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
