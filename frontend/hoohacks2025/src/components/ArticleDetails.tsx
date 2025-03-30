import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaperType } from "@/api/papers";

const ArticleDetails = ({
  currentPaper,
}: {
  currentPaper: PaperType | null;
}) => {
  return (
    <Card className="absolute flex w-1/5 bg-white h-3/8 flex-col gap-0 p-4 rounded-sm bottom-6 right-6">
      <h1 className="text-md font-bold">
        {currentPaper === null ? (
          "Article Details"
        ) : (
          <a href={currentPaper.url} target="_blank">
            {currentPaper.title.length > 45
              ? currentPaper.title.substring(0, 45) + "..."
              : currentPaper.title}
          </a>
        )}
      </h1>
      <Separator className="bg-black my-1 rounded-sm" />
      {currentPaper === null ? (
        <p>No paper selected</p>
      ) : (
        <div className="flex w-full h-full flex-col justify-between">
          <div className="text-md">
            <p>
              {currentPaper.summary === null
                ? "Summary not available..."
                : currentPaper.summary.length > 170
                ? currentPaper.summary.substring(0, 170).trim() + "..."
                : currentPaper.summary}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ArticleDetails;
