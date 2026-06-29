import { useEffect } from "react";

const isEditableElement = (element) => {
  if (!element || !element.tagName) {
    return false;
  }

  const tagName = element.tagName.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    element.isContentEditable
  );
};

export function useKeyboardShortcuts(shortcuts, onEscape) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isEditableElement(event.target)) {
        return;
      }

      if (event.key === "Escape") {
        onEscape?.();
        return;
      }

      if (!event.ctrlKey || !event.altKey) {
        return;
      }

      const key = event.key.toLowerCase();
      const shortcut = shortcuts.find((item) => item.key === key);

      if (!shortcut) {
        return;
      }

      event.preventDefault();
      shortcut.action();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts, onEscape]);
}