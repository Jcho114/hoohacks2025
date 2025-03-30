import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaperType } from "@/api/papers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
                : currentPaper.summary.length > 165
                ? currentPaper.summary.substring(0, 165).trim() + "..."
                : currentPaper.summary}
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full text-sm border-black border-1 cursor-pointer">
                More Info
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white overflow-scroll max-h-[80%]">
              <DialogHeader>
                <DialogTitle className="font-bold text-xl">
                  {currentPaper.title}
                </DialogTitle>
                <DialogDescription>
                  <h1>DOI: {currentPaper.doi}</h1>
                  <h1>Created: {currentPaper.created_date}</h1>
                  <h1>Type: {currentPaper.type}</h1>
                  <h1>Publisher: {currentPaper.publisher}</h1>
                  <h1>URL: {currentPaper.url}</h1>
                  <h1>Reference Count: {currentPaper.reference_count}</h1>
                  <h1>Referenced Count: {currentPaper.is_referenced_count}</h1>
                </DialogDescription>
              </DialogHeader>
              {currentPaper.summary ? (
                <>
                  <Separator className="bg-black !p-0 !m-0" />
                  <div className="font-bold text-md mb-[-10px]">Summary</div>
                  <div>
                    <h1 className="text-md">{currentPaper.summary}</h1>
                  </div>
                </>
              ) : null}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Card>
  );
};

export default ArticleDetails;
