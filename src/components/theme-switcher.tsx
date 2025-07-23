"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Waves, Trees, Monitor } from "lucide-react";

const themes = [
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "ocean", label: "Ocean", icon: Waves },
  { name: "forest", label: "Forest", icon: Trees },
  { name: "system", label: "System", icon: Monitor },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 rounded-lg bg-muted p-1">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.name;

        return (
          <button
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)}
            className={`
              flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }
            `}
            title={`Switch to ${themeOption.label} theme`}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{themeOption.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function CompactThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
        title="Switch theme"
      >
        <CurrentIcon size={16} />
        <span className="hidden sm:inline">{currentTheme.label}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border bg-popover p-1 shadow-lg">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.name;

              return (
                <button
                  key={themeOption.name}
                  onClick={() => {
                    setTheme(themeOption.name);
                    setIsOpen(false);
                  }}
                  className={`
                    flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{themeOption.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
