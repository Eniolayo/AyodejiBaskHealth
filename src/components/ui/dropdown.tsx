"use client";

import { AnimatePresence, motion } from "framer-motion";
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";

type DropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "bottom-right" | "left" | "right";
  dropdownClassName?: string;
};

function Dropdown({
  trigger,
  children,
  className = "",
  position = "bottom",
  dropdownClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsOpen(!isOpen);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return { bottom: "100%", left: 0, transformOrigin: "bottom" };
      case "bottom":
        return { top: "100%", left: 0, transformOrigin: "top left" };
      case "bottom-right":
        return { top: "100%", right: 0, transformOrigin: "top right" };
      case "left":
        return { top: 0, right: "100%", transformOrigin: "right" };
      case "right":
        return { top: 0, left: "100%", transformOrigin: "left" };
      default:
        return { top: "100%", left: 0, transformOrigin: "top left" };
    }
  };
  const handleCloseDropdown = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === "close-dropdown") {
      setIsOpen(false);
    }
  };
  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{
              ...getPositionStyles(),
              position: "absolute",
              zIndex: 1000,
            }}
            className={`${dropdownClassName}`}
            onClick={handleCloseDropdown}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
