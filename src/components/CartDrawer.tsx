import React, { useState } from 'react';
import { CartItem } from '../types/menu';
import { VegIndicator } from './VegIndicator';
import { X, Trash2, Plus, Minus, Info, ArrowRight, Sparkles, ChefHat } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  tableNumber?: string;
  onPlaceOrder?: (instructions?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  tableNumber = '04',
  onPlaceOrder,
}) => {
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isTakeaway = tableNumber === 'Takeaway';
  const displayTableLabel = isTakeaway ? 'Parcel' : `Table ${tableNumber || '04'}`;

  const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% restaurant GST
  const total = subtotal + gst;

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder?.(specialInstructions.trim() || undefined);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 border-t sm:border border-[var(--brand-border)] animate-in slide-in-from-bottom duration-200">
        {/* Grab Handle (mobile only) */}
        <div className="w-10 h-1 bg-zinc-300 rounded-full mx-auto my-2.5 shrink-0 sm:hidden" />

        {/* Drawer Header */}
        <div className="px-4 pb-3 border-b border-[var(--brand-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-brand font-black text-lg text-zinc-950">
              Your Order
            </span>
            <span className="text-[11px] font-black text-zinc-950 px-2 py-0.5 bg-[var(--brand-primary)] rounded-md border border-[var(--brand-accent)]">
              {displayTableLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] font-semibold text-red-600 hover:text-red-700 active-press mr-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 active-press"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                🛒
              </div>
              <h3 className="font-bold text-sm text-[var(--brand-text)]">
                Your cart is empty
              </h3>
              <p className="text-xs text-[var(--brand-muted)] max-w-xs mx-auto">
                Add delicious pure veg dishes, fresh juices, and shakes to start your order.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="divide-y divide-zinc-100">
                {cart.map((cartItem) => {
                  const { item, quantity } = cartItem;
                  const itemTotal = item.price * quantity;

                  return (
                    <div
                      key={item.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <div className="mt-1">
                          <VegIndicator size="sm" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-[var(--brand-text)] truncate">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-[var(--brand-muted)] block mt-0.5">
                            ₹{item.price} each
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper with #BAD605 */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center border border-[var(--brand-border)] bg-zinc-50 rounded-lg overflow-hidden h-7">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-7 h-full flex items-center justify-center text-zinc-600 hover:bg-zinc-200 active-press"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="w-6 text-center text-xs font-black text-zinc-950 tabular-nums">
                            {quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-full flex items-center justify-center text-zinc-600 hover:bg-zinc-200 active-press"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="tabular-nums font-bold text-xs text-[var(--brand-text)] w-12 text-right">
                          ₹{itemTotal}
                        </span>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-400 hover:text-red-500 active-press p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Special Instructions Input */}
              <div className="pt-2">
                <label
                  htmlFor="cooking-notes"
                  className="block text-xs font-semibold text-[var(--brand-text)] mb-1"
                >
                  Cooking Notes / Special Requests
                </label>
                <input
                  id="cooking-notes"
                  type="text"
                  placeholder="e.g. Less spicy, no onions, extra crispy, etc."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-zinc-50 border border-[var(--brand-border)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              {/* Order Bill Breakdown */}
              <div className="bg-zinc-50 rounded-xl p-3 border border-[var(--brand-border)] space-y-1.5 text-xs">
                <div className="flex justify-between text-[var(--brand-muted)]">
                  <span>Item Subtotal</span>
                  <span className="tabular-nums font-semibold text-[var(--brand-text)]">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[var(--brand-muted)]">
                  <span>Govt. Taxes (5% GST)</span>
                  <span className="tabular-nums font-semibold text-[var(--brand-text)]">
                    ₹{gst}
                  </span>
                </div>
                <div className="border-t border-[var(--brand-border)] pt-1.5 flex justify-between font-bold text-sm text-[var(--brand-text)]">
                  <span>Grand Total</span>
                  <span className="tabular-nums font-black text-sm text-zinc-950">
                    ₹{total}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 bg-zinc-50 border-t border-[var(--brand-border)] shrink-0">
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-[var(--brand-primary)] text-zinc-950 hover:bg-[var(--brand-accent)] font-black text-xs tracking-wide flex items-center justify-between px-4 shadow-sm active-press disabled:opacity-75 border border-black/10 transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2 w-full text-zinc-950">
                  <ChefHat className="w-4 h-4 animate-bounce" />
                  <span>Sending Order to Kitchen...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 text-zinc-950">
                    <span>Place Order</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="tabular-nums font-black text-sm text-zinc-950">
                    ₹{total}
                  </span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[var(--brand-muted)] mt-1.5">
              Instant Kitchen Order Ticket · {displayTableLabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
