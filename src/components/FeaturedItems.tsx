import React from 'react';
import { MenuItem } from '../types/menu';
import { VegIndicator } from './VegIndicator';
import { FoodImage } from './FoodImage';
import { Plus, Minus, Flame } from 'lucide-react';

interface FeaturedItemsProps {
  items: MenuItem[];
  getItemQuantity: (item: MenuItem) => number;
  onOpenItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (item: MenuItem, delta: number) => void;
}

export const FeaturedItems: React.FC<FeaturedItemsProps> = ({
  items,
  getItemQuantity,
  onOpenItem,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const popularItems = items.filter((i) => i.isPopular);

  if (popularItems.length === 0) return null;

  return (
    <section className="mb-5">
      <div className="flex items-center justify-between mb-2.5 px-1 sm:px-0">
        <div className="flex items-center gap-1.5">
          {/* Flame kept in bold Red for Bestsellers */}
          <Flame className="w-4 h-4 text-red-600 fill-current" />
          <h2 className="text-sm sm:text-base font-black text-[var(--brand-text)] tracking-tight">
            Dr. Joos Bestsellers
          </h2>
        </div>
        <span className="text-[11px] font-medium text-[var(--brand-muted)]">
          Most ordered
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-0.5">
        {popularItems.map((item) => {
          const qty = getItemQuantity(item);
          return (
            <div
              key={item.id}
              onClick={() => onOpenItem(item)}
              className="w-40 sm:w-46 shrink-0 bg-white rounded-xl border border-[var(--brand-border)] p-2.5 flex flex-col justify-between shadow-2xs hover:border-[var(--brand-primary)] hover:shadow-xs transition-all cursor-pointer select-none"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="w-full mb-2">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    category={item.category}
                    name={item.name}
                    size="featured"
                  />
                </div>

                {/* Dietary & Bestseller Badge */}
                <div className="flex items-center gap-1.5 mb-1">
                  <VegIndicator size="sm" />
                  <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wider truncate">
                    {item.badge || 'Popular'}
                  </span>
                </div>

                <h3 className="font-semibold text-xs text-[var(--brand-text)] line-clamp-1 leading-snug">
                  {item.name}
                </h3>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--brand-border)]">
                <span className="font-extrabold text-xs tabular-nums text-[var(--brand-text)]">
                  ₹{item.price}
                </span>

                <div onClick={(e) => e.stopPropagation()}>
                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-2.5 py-1 rounded-lg bg-white border-2 border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-zinc-950 text-xs font-black shadow-2xs active-press flex items-center gap-1 transition-colors"
                      aria-label={`Add ${item.name}`}
                    >
                      ADD <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  ) : (
                    <div className="h-6 px-1.5 rounded-lg bg-[var(--brand-primary)] border border-[var(--brand-accent)] text-zinc-950 flex items-center gap-1.5 text-xs font-black shadow-xs">
                      <button
                        onClick={() => onUpdateQuantity(item, -1)}
                        className="p-0.5 active-press"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[3]" />
                      </button>
                      <span className="tabular-nums text-xs min-w-[12px] text-center font-black">
                        {qty}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item, 1)}
                        className="p-0.5 active-press"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
