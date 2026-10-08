import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types/menu';
import { VegIndicator } from './VegIndicator';
import { FoodImage } from './FoodImage';
import { X, Plus, Minus, Info } from 'lucide-react';

interface ItemBottomSheetProps {
  item: MenuItem | null;
  initialQuantity?: number;
  onClose: () => void;
  onAddToCart?: (item: MenuItem, quantity: number) => void;
  onSetQuantity?: (item: MenuItem, quantity: number) => void;
}

export const ItemBottomSheet: React.FC<ItemBottomSheetProps> = ({
  item,
  initialQuantity = 0,
  onClose,
  onAddToCart,
  onSetQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Sync incoming item: if already in cart, show that quantity; else default to 1
  useEffect(() => {
    if (item) {
      setQuantity(initialQuantity > 0 ? initialQuantity : 1);
    }
  }, [item, initialQuantity]);

  if (!item) return null;

  const totalPrice = item.price * quantity;
  const isAlreadyInCart = initialQuantity > 0;

  const handleConfirm = () => {
    if (onSetQuantity) {
      onSetQuantity(item, quantity);
    } else {
      onAddToCart?.(item, quantity);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Sheet Body (Bottom Sheet on mobile, Centered Modal on desktop) */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden z-10 border-t sm:border border-[var(--brand-border)] animate-in slide-in-from-bottom duration-200">
        {/* Close Button Header */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white active-press"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-3.5">
          {/* Detailed Food Image with fallback */}
          <FoodImage
            src={item.image}
            alt={item.name}
            category={item.category}
            name={item.name}
            size="detail"
          />

          {/* Dish Header Info */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <VegIndicator size="sm" />
              <span className="text-[11px] font-black text-zinc-950 bg-[var(--brand-primary)] px-2 py-0.5 rounded uppercase tracking-wider">
                {item.category}
              </span>
              {item.badge && (
                <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">
                  {item.badge}
                </span>
              )}
            </div>

            <h3 className="font-bold text-lg text-[var(--brand-text)] leading-snug">
              {item.name}
            </h3>

            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black tabular-nums text-[var(--brand-text)]">
                ₹{item.price}
              </span>
            </div>

            <p className="text-xs text-[var(--brand-muted)] mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-4 bg-zinc-50 border-t border-[var(--brand-border)] flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="h-11 px-2.5 rounded-xl bg-white border border-[var(--brand-border)] flex items-center justify-between w-28 shrink-0 shadow-2xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-7 h-7 flex items-center justify-center text-[var(--brand-secondary)] disabled:opacity-30 active-press"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>
            <span className="text-sm font-black tabular-nums text-[var(--brand-text)]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 flex items-center justify-center text-[var(--brand-secondary)] active-press"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Add / Update Cart CTA with #BAD605 styling */}
          <button
            onClick={handleConfirm}
            className="flex-1 h-11 rounded-xl bg-[var(--brand-primary)] text-zinc-950 hover:bg-[var(--brand-accent)] font-black text-xs tracking-wide flex items-center justify-between px-4 shadow-sm active-press border border-black/10"
          >
            <span>{isAlreadyInCart ? 'Update Cart' : 'Add to Cart'}</span>
            <span className="tabular-nums font-black text-sm">
              ₹{totalPrice}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
