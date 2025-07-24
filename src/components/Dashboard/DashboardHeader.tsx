import Typography from "@/components/ui/typography";
import { PlayIcon, ReplayIcon } from "@/components/ui/icons";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Typography variant="heading-03" className="text-text-primary">
        Dashboard
      </Typography>
      <div className="flex gap-2 items-center">
        <Typography variant="body-02" className="text-neutral-400">
          Last updated 2m ago
        </Typography>
        <button className="border flex items-center gap-2 border-neutral-200 py-2 text-[13px] px-3 bg-neutral-50 rounded-lg cursor-pointer text-text-primary">
          <PlayIcon className="size-3 text-text-primary" />
          Resume auto-fetch
        </button>
        <button className="border flex items-center gap-2 border-neutral-200 p-2 text-[13px]  bg-neutral-50 rounded-lg cursor-pointer text-text-primary">
          <ReplayIcon className="size-5 text-text-primary transform scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
};
