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
      className="sticky top-16 z-20 bg-[var(--brand-background)]/95 backdrop-blur-md border-b border-[var(--brand-border)] py-2.5 sm:py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                data-active={isActive}
                onClick={() => onSelectCategory(category)}
                className={`whitespace-nowrap px-4 py-2 text-xs sm:text-sm rounded-full shrink-0 transition-all select-none active-press cursor-pointer ${
                  isActive
                    ? 'bg-[var(--brand-primary)] text-zinc-950 font-black shadow-xs border border-[var(--brand-accent)]'
                    : 'bg-white text-[var(--brand-muted)] border border-[var(--brand-border)] hover:border-zinc-400 hover:text-[var(--brand-text)] font-medium shadow-2xs'
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
