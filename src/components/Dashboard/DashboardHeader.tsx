import Typography from "@/components/ui/typography";
import { PlayIcon, ReplayIcon } from "@/components/ui/icons";

export const DashboardHeader = () => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <Typography variant="heading-03" className="text-text-primary">
        Dashboard
      </Typography>
      <div className="flex items-center gap-2">
        <Typography variant="body-02" className="text-neutral-400">
          Last updated 2m ago
        </Typography>
        <button className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px]">
          <PlayIcon className="text-text-primary size-3" />
          Resume auto-fetch
        </button>
        <button className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px]">
          <ReplayIcon className="text-text-primary size-5 scale-x-[-1] transform" />
        </button>
      </div>
    </div>
  );
};
