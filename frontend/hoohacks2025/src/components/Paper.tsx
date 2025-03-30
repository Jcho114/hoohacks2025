import { PaperType } from "@/api/papers";

const Paper = ({
  paper_information,
  cancel,
  setCurrentPaper,
}: {
  paper_information: PaperType;
  cancel: boolean;
  setCurrentPaper: (paper: PaperType | null) => void;
}) => {
  return (
    <div>
      <div
        className="flex flex-row justify-between items-center w-full"
        onClick={
          cancel
            ? () => {}
            : () => {
                setCurrentPaper(paper_information);
              }
        }
      >
        <div>
          <h2 className="font-bold text-md">
            {paper_information.title.length > 45
              ? paper_information.title.substring(0, 45) + "..."
              : paper_information.title}
          </h2>
          <p className="text-md">
            {
              new Date(paper_information.created_date)
                .toISOString()
                .split("T")[0]
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paper;
