import React, { useState } from 'react';
import { CartItem, PlacedOrder } from '../types/menu';
import { VegIndicator } from './VegIndicator';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Clock,
  ChevronRight,
  ChefHat,
  Sparkles,
} from 'lucide-react';

interface DesktopCartSidebarProps {
  cart: CartItem[];
  tableNumber: string;
  onOpenTableSelector: () => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (instructions?: string) => void;
  placedOrder: PlacedOrder | null;
  onOpenOrderStatus: () => void;
}

export const DesktopCartSidebar: React.FC<DesktopCartSidebarProps> = ({
  cart,
  tableNumber,
  onOpenTableSelector,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  placedOrder,
  onOpenOrderStatus,
}) => {
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const isTakeaway = tableNumber === 'Takeaway';
  const displayTableLabel = isTakeaway ? 'Parcel' : `Table ${tableNumber || '04'}`;

  const handleOrderSubmit = () => {
    if (cart.length === 0 || isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder(instructions.trim() || undefined);
      setInstructions('');
    }, 600);
  };

  return (
    <aside className="sticky top-20 space-y-4">
      {/* Active Order Banner (if an order has been placed) */}
      {placedOrder && (
        <div
          onClick={onOpenOrderStatus}
          className="bg-zinc-950 text-white rounded-2xl p-4 shadow-xl border border-zinc-800 cursor-pointer hover:bg-zinc-900 transition-all active-press"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black text-[var(--brand-primary)]">
                Live Kitchen Order
              </span>
            </div>
            <span className="text-[11px] font-bold text-zinc-400">
              Token {placedOrder.tokenNumber}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Est. 12-14 mins</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400 text-[11px]">
                  {placedOrder.tableNumber === 'Takeaway' ? 'Parcel' : `Table ${placedOrder.tableNumber}`}
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 block mt-0.5">
                {placedOrder.items.reduce((a, b) => a + b.quantity, 0)} items · Total ₹{placedOrder.total}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-black text-[var(--brand-primary)]">
              <span>View</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        </div>
      )}

      {/* Cart Container Card */}
      <div className="bg-white rounded-2xl border border-[var(--brand-border)] shadow-xs overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--brand-border)] flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Your Order</h3>
              <button
                onClick={onOpenTableSelector}
                className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{displayTableLabel}</span>
                <span className="text-[10px] text-[var(--brand-muted)] underline ml-0.5">
                  Change
                </span>
              </button>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Cart Items List */}
        <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="py-10 text-center space-y-2.5">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-xl">
                🛒
              </div>
              <p className="text-xs font-semibold text-zinc-700">
                Your cart is empty
              </p>
              <p className="text-[11px] text-zinc-400 max-w-[200px] mx-auto leading-relaxed">
                Add fresh juices, combos, and snacks to begin your order.
              </p>
            </div>
          ) : (
            cart.map((cartItem) => {
              const itemTotal = cartItem.item.price * cartItem.quantity;
              return (
                <div
                  key={cartItem.item.id}
                  className="flex items-center justify-between gap-3 pb-2.5 border-b border-zinc-100 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <VegIndicator size="sm" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-zinc-900 truncate leading-snug">
                        {cartItem.item.name}
                      </h4>
                      <span className="text-[11px] text-zinc-500 tabular-nums">
                        ₹{cartItem.item.price} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 px-1 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-zinc-600 hover:text-zinc-900 active-press cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums text-zinc-900">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-zinc-600 hover:text-zinc-900 active-press cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>

                    <span className="text-xs font-black tabular-nums text-zinc-900 w-12 text-right">
                      ₹{itemTotal}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Actions (When items exist) */}
        {cart.length > 0 && (
          <div className="p-4 bg-zinc-50/80 border-t border-[var(--brand-border)] space-y-3.5">
            {/* Special Instructions */}
            <div>
              <input
                type="text"
                placeholder="Special instructions (e.g. less spicy)..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-zinc-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Govt. GST (5%)</span>
                <span className="tabular-nums font-semibold text-zinc-900">₹{gst}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-zinc-950 pt-2 border-t border-zinc-200">
                <span>To Pay</span>
                <span className="tabular-nums font-black text-base">₹{total}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handleOrderSubmit}
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-accent)] text-zinc-950 font-black text-xs flex items-center justify-between shadow-xs transition-all active-press cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="mx-auto flex items-center gap-2">
                  <ChefHat className="w-4 h-4 animate-spin" />
                  Sending to Kitchen...
                </span>
              ) : (
                <>
                  <span>Place Order ({displayTableLabel})</span>
                  <div className="flex items-center gap-1.5">
                    <span className="tabular-nums text-sm">₹{total}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Trust & Guarantee Footnote */}
      <div className="p-3 bg-white rounded-xl border border-[var(--brand-border)] text-[11px] text-zinc-500 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-zinc-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Dr. Joos Kitchen Promise</span>
        </div>
        <p className="leading-relaxed">
          100% Pure Veg • Clean prep • Fresh juice pressed on order
        </p>
      </div>
    </aside>
  );
};
