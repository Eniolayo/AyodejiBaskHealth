"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { PlayIcon, ReplayIcon, SunIcon } from "@/components/ui/icons";

export default function Home() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <main className="border border-neutral-200 font-geist min-h-screen">
      <header className="p-3 flex justify-between border-b border-neutral-200 bg-neutral-50 items-center">
        <div className="flex gap-4 w-[30%]">
          <button className="border border-neutral-200 py-2 text-[13px] px-3 bg-neutral-50 rounded-lg">
            Reset to default
          </button>
          <div className="flex items-center gap-2">
            <Switch checked={isSwitchOn} onCheckedChange={setIsSwitchOn} />
            <Typography variant="body-02" className="text-text-primary">
              Edit mode
            </Typography>
          </div>
        </div>

        <img
          src="/AcmeLogo.avif"
          alt="logo"
          className=" w-[136px] object-contain h-10"
        />
        <div className="flex gap-2 w-[30%] justify-end">
          <button className="cursor-pointer">
            <SunIcon className="size-5 text-text-primary" />
          </button>
        </div>
      </header>
      <section className="p-3">
        <div className="flex justify-between items-center">
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
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
        exercitationem omnis in laudantium impedit. A, corrupti quo odit et
        neque perspiciatis veritatis commodi aperiam. Voluptatibus nihil saepe
        itaque ab ipsum.
      </section>
    </main>
  );
}
