"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { SunIcon } from "@/components/ui/icons";
import { useState } from "react";

function Header() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  return (
    <header className="border-b border-neutral-200 bg-neutral-50 py-3">
      <div className="mx-auto flex max-w-[1580px] items-center justify-between px-3">
        <div className="flex w-[30%] gap-4">
          <button className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px]">
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
          className="h-10 w-[136px] object-contain"
        />
        <div className="flex w-[30%] justify-end gap-2">
          <button className="cursor-pointer">
            <SunIcon className="text-text-primary size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
