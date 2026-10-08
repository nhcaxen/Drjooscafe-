import React from 'react';
import { MenuItem } from '../types/menu';
import { MenuItemCard } from './MenuItemCard';

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
  getItemQuantity: (item: MenuItem) => number;
  onOpenDetails: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (item: MenuItem, delta: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  category,
  items,
  getItemQuantity,
  onOpenDetails,
  onAddToCart,
  onUpdateQuantity,
}) => {
  if (items.length === 0) return null;

  return (
    <section id={category.replace(/\s+/g, '-').toLowerCase()} className="space-y-2.5">
      {/* Category Section Header */}
      <div className="flex items-baseline justify-between px-1 border-b border-[var(--brand-border)] pb-1.5">
        <h2 className="text-base font-bold text-[var(--brand-text)] tracking-tight">
          {category}
        </h2>
        <span className="text-[11px] font-semibold text-[var(--brand-muted)] tabular-nums">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={getItemQuantity(item)}
            onOpenDetails={onOpenDetails}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </section>
  );
};
