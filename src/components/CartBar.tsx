import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { CartItem } from '../types/menu';

interface CartBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const CartBar: React.FC<CartBarProps> = ({ cart, onOpenCart }) => {
  const totalCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  if (totalCount === 0) return null;

  const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  return (
    <aside
      aria-label="Sticky cart summary"
      className="fixed bottom-3 left-0 right-0 z-30 px-4 pointer-events-none"
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full h-12.5 rounded-xl bg-[var(--brand-primary)] text-zinc-950 hover:bg-[var(--brand-accent)] px-4 flex items-center justify-between shadow-xl shadow-lime-950/20 active-press transition-colors border border-black/10"
        >
          {/* Left Count & Price */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-black/15 flex items-center justify-center font-black text-xs tabular-nums text-zinc-950">
              {totalCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-zinc-950">
              <span>{totalCount === 1 ? '1 item' : `${totalCount} items`}</span>
              <span className="opacity-40">•</span>
              <span className="text-sm font-black tabular-nums">₹{subtotal}</span>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-1 text-xs font-black tracking-wide text-zinc-950">
            <span>View Cart</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </div>
        </button>
      </div>
    </aside>
  );
};
