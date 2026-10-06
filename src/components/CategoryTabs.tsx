import React, { useRef, useEffect } from 'react';
import { CATEGORIES } from '../data/menuData';

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view smoothly
  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector<HTMLButtonElement>(
        '[data-active="true"]'
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [activeCategory]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-14 z-20 bg-[var(--brand-background)]/95 backdrop-blur-xs border-b border-[var(--brand-border)] py-2.5"
    >
      <div className="max-w-md mx-auto">
        <div
          ref={containerRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                data-active={isActive}
                onClick={() => onSelectCategory(category)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs rounded-full shrink-0 transition-all select-none active-press ${
                  isActive
                    ? 'bg-[var(--brand-primary)] text-zinc-950 font-black shadow-2xs border border-[var(--brand-accent)]'
                    : 'bg-white text-[var(--brand-muted)] border border-[var(--brand-border)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-text)] font-semibold'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
