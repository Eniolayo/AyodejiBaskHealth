"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "@/components/ui/icons";
import { useTheme } from "next-themes";
import { useDashboardLayout } from "@/contexts/DashboardLayoutContext";

function Header() {
  const { state, toggleEditMode, resetToDefault } = useDashboardLayout();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="border-b border-neutral-200 bg-neutral-50 py-3">
      <div className="mx-auto flex max-w-[1580px] items-center justify-between px-3">
        <div className="flex w-[30%] gap-4">
          <Button onClick={resetToDefault}>Reset to default</Button>
          <div className="flex items-center gap-2">
            <Switch
              checked={state.isEditMode}
              onCheckedChange={toggleEditMode}
            />
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
          <Button
            variant="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
