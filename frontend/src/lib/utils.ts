export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export const clearHighlights = (els?: HTMLElement[]) => {
  const indicators = els || [];
  indicators.forEach((i) => (i.style.opacity = "0"));
};

export const getNearestIndicator = (
  e: DragEvent,
  indicators: HTMLElement[]
) => {
  const DISTANCE_OFFSET = 50;

  return indicators.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientY - (box.top + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );
};

