import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onToggleSearch: () => void;
  onOpenCart: () => void;
  cartCount: number;
  tableNumber?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSearch,
  onOpenCart,
  cartCount,
  tableNumber = '04',
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[var(--brand-border)]">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Dr. Joos Authentic Brand Text directly aligned to left */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline leading-none">
            {/* Dr. in Lime-Green */}
            <span className="font-brand font-black text-2xl tracking-tight text-[#94C810]">
              Dr.
            </span>
            {/* Joos in Hot-Pink */}
            <span className="font-brand font-black text-2xl tracking-tight text-[#E6007A] ml-0.5">
              Joos
            </span>
            {/* café in Orange */}
            <span className="font-brand font-black text-sm text-[#FF6D00] lowercase ml-1 tracking-tight">
              café
            </span>
          </div>
          <span className="text-[10px] font-medium text-zinc-500 tracking-wide mt-0.5">
            Clerk Colony, Indore
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          {/* Search Trigger */}
          <button
            onClick={onToggleSearch}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--brand-secondary)] hover:bg-zinc-100 active-press transition-colors"
            aria-label="Search menu"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[var(--brand-secondary)] hover:bg-zinc-100 active-press transition-colors"
            aria-label={`View cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[var(--brand-primary)] text-zinc-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
