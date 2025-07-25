"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { SunIcon, MoonIcon } from "@/components/ui/icons";
import { useTheme } from "next-themes";
import { useDashboardLayout } from "@/contexts/DashboardLayoutContext";

function Header() {
  const { theme, setTheme } = useTheme();
  const { isEditMode, setIsEditMode, resetToDefault } = useDashboardLayout();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleResetToDefault = () => {
    resetToDefault();
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="border-b border-neutral-200 bg-neutral-50 py-3">
      <div className="mx-auto flex max-w-[1580px] items-center justify-between px-3">
        <div className="flex w-[30%] gap-4">
          <button
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px] transition-colors hover:bg-neutral-100"
            onClick={handleResetToDefault}
          >
            Reset to default
          </button>
          <div className="flex items-center gap-2">
            <Switch checked={isEditMode} onCheckedChange={setIsEditMode} />
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
          <button
            className="text-text-primary cursor-pointer rounded-lg p-2 hover:bg-neutral-500 hover:text-neutral-50"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
