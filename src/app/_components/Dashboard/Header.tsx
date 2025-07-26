"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  CloseRoundedIcon,
} from "@/components/ui/icons";
import { useTheme } from "next-themes";
import { useDashboardLayout } from "@/contexts/DashboardLayoutContext";

function Header() {
  const { state, toggleEditMode, resetToDefault } = useDashboardLayout();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!mounted) {
    return null;
  }

  const ControlsSection = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-4 ${className}`}>
      <Button onClick={resetToDefault} className="w-auto">
        Reset to default
      </Button>
      <div className="flex items-center gap-2">
        <Switch checked={state.isEditMode} onCheckedChange={toggleEditMode} />
        <Typography variant="body-02" className="text-text-primary">
          Edit mode
        </Typography>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-[99999] border-b border-neutral-200 bg-neutral-50 py-3">
      <div className="mx-auto flex max-w-[1580px] items-center justify-between px-4">
        <div className="hidden w-[30%] lg:flex">
          <ControlsSection />
        </div>

        <Image
          src="/AcmeLogo.avif"
          alt="logo"
          width={136}
          height={40}
          className="h-10 w-[136px] object-contain"
        />

        <div className="flex w-[30%] justify-end gap-1 lg:justify-end">
          <Button
            variant="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            data-testid="theme-toggle"
          >
            {theme === "dark" ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </Button>
          <Button
            variant="icon"
            onClick={toggleMobileMenu}
            title="Toggle menu"
            className="grid place-items-center lg:hidden"
          >
            {isMobileMenuOpen ? (
              <CloseRoundedIcon className="size-5" />
            ) : (
              <HamburgerIcon className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth motion
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="mx-auto max-w-[1580px] px-3 pt-3 pb-3">
              <ControlsSection className="justify-between" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
