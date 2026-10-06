import React from 'react';
import { MenuItem } from '../types/menu';
import { VegIndicator } from './VegIndicator';
import { FoodImage } from './FoodImage';
import { Plus, Minus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onOpenDetails: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (item: MenuItem, delta: number) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  quantity,
  onOpenDetails,
  onAddToCart,
  onUpdateQuantity,
}) => {
  return (
    <article
      onClick={() => onOpenDetails(item)}
      className="bg-white rounded-xl p-3 border border-[var(--brand-border)] hover:border-[var(--brand-primary)] transition-colors shadow-2xs flex items-center justify-between gap-3 cursor-pointer select-none active:bg-zinc-50"
    >
      {/* Left Content Column */}
      <div className="flex-1 min-w-0 pr-1">
        {/* Veg mark & Bestseller badge */}
        <div className="flex items-center gap-1.5 mb-1">
          <VegIndicator size="sm" />
          {item.badge && (
            <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">
              {item.badge}
            </span>
          )}
        </div>

        {/* Item Name */}
        <h3 className="font-bold text-sm text-[var(--brand-text)] leading-snug">
          {item.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-sm font-extrabold tabular-nums text-[var(--brand-text)]">
            ₹{item.price}
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-[var(--brand-muted)] line-clamp-2 mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Right Visual & Add Button Column */}
      <div className="flex flex-col items-center shrink-0 w-22 sm:w-24">
        {/* Real Food Image with 1:1 Aspect Ratio */}
        <FoodImage
          src={item.image}
          alt={item.name}
          category={item.category}
          name={item.name}
          size="card"
        />

        {/* Add Button / Stepper with #BAD605 lime branding */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="-mt-3.5 z-10 w-20 flex justify-center"
        >
          {quantity === 0 ? (
            <button
              onClick={() => onAddToCart(item)}
              className="w-20 h-7.5 rounded-lg bg-white border-2 border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-zinc-950 font-black text-xs shadow-xs flex items-center justify-center gap-1 active-press transition-colors"
              aria-label={`Add ${item.name} to cart`}
            >
              <span>ADD</span>
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          ) : (
            <div className="w-20 h-7.5 rounded-lg bg-[var(--brand-primary)] border border-[var(--brand-accent)] text-zinc-950 font-black text-xs shadow-xs flex items-center justify-between px-1.5">
              <button
                onClick={() => onUpdateQuantity(item, -1)}
                className="w-5 h-5 flex items-center justify-center active-press"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="tabular-nums text-xs min-w-[14px] text-center font-black">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item, 1)}
                className="w-5 h-5 flex items-center justify-center active-press"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
