import React from "react";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { SunIcon } from "@/components/ui/icons";
import { useState } from "react";

function Header() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  return (
    <header className="py-3 border-b border-neutral-200 bg-neutral-50 ">
      <div className="flex px-3 justify-between items-center max-w-[1580px] mx-auto">
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
      </div>
    </header>
  );
}

export default Header;
