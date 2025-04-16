import { useEffect } from "react";

export default function useFocusTrap(ref, isActive) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElementsString = 'a[href], button:not([disabled]), textarea, input, select';
    const container = ref.current;
    const focusableElements = container.querySelectorAll(focusableElementsString);

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    function handleTab(e) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    firstEl?.focus();

    return () => {
      document.removeEventListener("keydown", handleTab);
    };
  }, [isActive, ref]);
}
