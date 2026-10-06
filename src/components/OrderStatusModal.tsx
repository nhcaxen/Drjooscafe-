import React, { useState, useEffect } from 'react';
import { PlacedOrder, OrderStep } from '../types/menu';
import {
  CheckCircle2,
  Clock,
  Utensils,
  ChefHat,
  BellRing,
  QrCode,
  CreditCard,
  Banknote,
  X,
  ChevronDown,
  ChevronUp,
  Droplets,
  Sparkles,
  Receipt,
  Copy,
  Check,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface OrderStatusModalProps {
  order: PlacedOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderMore: () => void;
  onUpdatePayment?: (isPaid: boolean) => void;
  isJustPlaced?: boolean;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderMore,
  onUpdatePayment,
  isJustPlaced = false,
}) => {
  const [activeStep, setActiveStep] = useState<OrderStep>('preparing');
  const [secondsRemaining, setSecondsRemaining] = useState(14 * 60);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [serviceAlert, setServiceAlert] = useState<string | null>(null);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isPaidLocally, setIsPaidLocally] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Sync remaining seconds and kitchen progress from placedAtTimestamp
  useEffect(() => {
    if (isOpen && order) {
      const elapsedSeconds = order.placedAtTimestamp
        ? Math.floor((Date.now() - order.placedAtTimestamp) / 1000)
        : 0;
      const initialRemaining = Math.max(30, 14 * 60 - elapsedSeconds);
      setSecondsRemaining(initialRemaining);

      if (elapsedSeconds < 8) {
        setActiveStep('received');
      } else if (elapsedSeconds < 20) {
        setActiveStep('accepted');
      } else {
        setActiveStep('preparing');
      }
    }
  }, [isOpen, order?.id, order?.placedAtTimestamp]);

  // Temporary celebration screen only when an order is freshly placed
  useEffect(() => {
    if (isOpen && isJustPlaced) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 1900);
      return () => clearTimeout(timer);
    } else {
      setShowCelebration(false);
    }
  }, [isOpen, isJustPlaced, order?.id]);

  // Sync order payment status
  useEffect(() => {
    if (order?.isPaid) {
      setIsPaidLocally(true);
    }
  }, [order]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, secondsRemaining]);

  // Simulated Kitchen Step advancement
  useEffect(() => {
    if (!isOpen || !order) return;
    const elapsedSeconds = order.placedAtTimestamp
      ? Math.floor((Date.now() - order.placedAtTimestamp) / 1000)
      : 0;

    if (elapsedSeconds < 8) {
      const timer1 = setTimeout(() => setActiveStep('accepted'), (8 - elapsedSeconds) * 1000);
      const timer2 = setTimeout(() => setActiveStep('preparing'), (20 - elapsedSeconds) * 1000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (elapsedSeconds < 20) {
      const timer2 = setTimeout(() => setActiveStep('preparing'), (20 - elapsedSeconds) * 1000);
      return () => clearTimeout(timer2);
    }
  }, [isOpen, order?.id, order?.placedAtTimestamp]);

  if (!isOpen || !order) return null;

  const displayTableLabel = order.tableNumber === 'Takeaway' ? 'Parcel' : `Table ${order.tableNumber}`;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const steps = [
    {
      id: 'received',
      title: 'Order Sent',
      desc: 'Received by kitchen system',
      icon: CheckCircle2,
    },
    {
      id: 'accepted',
      title: 'Chef Accepted',
      desc: 'Ingredients prepped fresh',
      icon: ChefHat,
    },
    {
      id: 'preparing',
      title: 'Cooking Fresh',
      desc: 'On tawa, oven & beverage station',
      icon: Flame,
    },
    {
      id: 'ready',
      title: 'Plated & Ready',
      desc: 'Hot & fresh at dispatch',
      icon: Utensils,
    },
  ];

  const getStepIndex = (step: OrderStep) => {
    switch (step) {
      case 'received':
        return 0;
      case 'accepted':
        return 1;
      case 'preparing':
        return 2;
      case 'ready':
      case 'served':
        return 3;
    }
  };

  const currentStepIdx = getStepIndex(activeStep);

  const handleCallService = (type: string) => {
    setServiceAlert(type);
    setTimeout(() => {
      setServiceAlert(null);
    }, 4500);
  };

  const handleCopyUpi = async () => {
    const upiId = 'drjoos.indore@okaxis';
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(upiId);
        setCopiedUpi(true);
        setTimeout(() => setCopiedUpi(false), 2500);
        return;
      }
    } catch {
      // Fall through to fallback
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = upiId;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    } catch {
      // Gracefully handle if clipboard is disabled
    }
  };

  const handleConfirmUpiPaid = () => {
    setIsPaidLocally(true);
    setShowUpiModal(false);
    onUpdatePayment?.(true);
    handleCallService('Payment marked received via UPI! Thank you.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10 border border-zinc-200 animate-in zoom-in-95 duration-200">
        {showCelebration ? (
          /* One-time celebratory screen right after placing order */
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[380px] space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Animated Checkmark Bubble */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-bounce duration-700">
                <Check className="w-10 h-10 stroke-[3.5]" />
              </div>
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--brand-primary)] text-zinc-950 rounded-full flex items-center justify-center text-xs font-black shadow-xs ring-2 ring-white">
                ✨
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-black text-xl text-zinc-950 tracking-tight">
                Order Placed Successfully!
              </h2>
              <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                Sent directly to Dr. Joos master kitchen
              </p>
            </div>

            {/* Badges */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <span className="text-xs font-black text-zinc-950 bg-[var(--brand-primary)] px-2.5 py-1 rounded-lg border border-[var(--brand-accent)] shadow-2xs">
                Token {order.tokenNumber}
              </span>
              <span className="text-xs font-bold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg border border-zinc-200">
                Order #{order.id}
              </span>
              <span className="text-xs font-bold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg border border-zinc-200">
                {displayTableLabel}
              </span>
            </div>

            {/* Quick action / automatic transition notice */}
            <button
              onClick={() => setShowCelebration(false)}
              className="pt-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 active-press transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Opening Live Kitchen Status...</span>
            </button>
          </div>
        ) : (
          <>
            {/* Sticky Header with Order ID */}
            <div className="px-4 py-3 bg-[var(--brand-primary)] text-zinc-950 flex items-center justify-between shrink-0 shadow-xs border-b border-[var(--brand-accent)]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center font-bold text-sm">
                  🛎️
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm tracking-wide text-zinc-950">
                      Order #{order.id}
                    </span>
                    <span className="text-[10px] font-black bg-black/15 px-1.5 py-0.5 rounded text-zinc-950">
                      {displayTableLabel}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-800 font-semibold block">
                    Token {order.tokenNumber} · {order.createdAt}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 active:bg-black/30 flex items-center justify-center text-zinc-950 transition-colors"
                title="Minimize"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              {/* Live Kitchen Status Card (HERO ELEMENT AT TOP) */}
              <div className="bg-white rounded-2xl p-4 border border-[var(--brand-border)] shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold text-xs text-[var(--brand-text)]">
                      Live Kitchen Status
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-zinc-950 bg-[var(--brand-primary)] border border-[var(--brand-accent)] px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Est. {timeFormatted}</span>
                  </div>
                </div>

            {/* Stepper Steps */}
            <div className="space-y-3 relative pl-2 pt-1">
              {steps.map((step, idx) => {
                const isCompleted = idx < currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex items-start gap-3 relative">
                    {/* Line connecting */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-6 w-0.5 h-7 -translate-x-1/2 ${
                          idx < currentStepIdx ? 'bg-emerald-500' : 'bg-zinc-200'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 font-black transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-[var(--brand-primary)] text-zinc-950 shadow-sm ring-4 ring-lime-200 border border-[var(--brand-accent)]'
                          : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Step Text */}
                    <div className="flex-1 -mt-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-zinc-950 font-black'
                              : isCompleted
                              ? 'text-zinc-900'
                              : 'text-zinc-400'
                          }`}
                        >
                          {step.title}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-black text-zinc-950 bg-[var(--brand-primary)] px-1.5 py-0.2 rounded border border-[var(--brand-accent)]">
                            In Progress
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[10px] font-semibold text-emerald-600">
                            Done ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--brand-muted)] leading-tight">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note about kitchen */}
            <div className="p-2.5 bg-zinc-50 rounded-xl text-[11px] text-[var(--brand-muted)] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Items are freshly cooked on order in our 100% veg kitchen.</span>
            </div>
          </div>

          {/* Quick Table Assistance Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-[var(--brand-muted)] tracking-wider uppercase block">
              Table Assistance ({displayTableLabel})
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCallService(`Server called! Attendant is approaching ${displayTableLabel}.`)}
                className="p-2.5 rounded-xl bg-white border border-[var(--brand-border)] hover:bg-zinc-50 active-press flex flex-col items-center gap-1 shadow-2xs text-center cursor-pointer"
              >
                <BellRing className="w-4 h-4 text-[var(--brand-primary)]" />
                <span className="text-[11px] font-bold text-[var(--brand-text)]">
                  Call Waiter
                </span>
              </button>

              <button
                onClick={() => handleCallService(`Drinking water requested for ${displayTableLabel}.`)}
                className="p-2.5 rounded-xl bg-white border border-[var(--brand-border)] hover:bg-zinc-50 active-press flex flex-col items-center gap-1 shadow-2xs text-center cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-sky-600" />
                <span className="text-[11px] font-bold text-[var(--brand-text)]">
                  Get Water
                </span>
              </button>

              <button
                onClick={() => handleCallService(`Extra cutlery/plates requested for ${displayTableLabel}.`)}
                className="p-2.5 rounded-xl bg-white border border-[var(--brand-border)] hover:bg-zinc-50 active-press flex flex-col items-center gap-1 shadow-2xs text-center cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-amber-600" />
                <span className="text-[11px] font-bold text-[var(--brand-text)]">
                  Extra Plates
                </span>
              </button>
            </div>
          </div>

          {/* Bill & Payment Section */}
          <div className="bg-white rounded-2xl border border-[var(--brand-border)] p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--brand-border)] pb-2.5">
              <div>
                <span className="text-xs text-[var(--brand-muted)] block">Total Bill Amount</span>
                <span className="text-xl font-black text-zinc-950 tabular-nums">
                  ₹{order.total}
                </span>
              </div>

              <div className="text-right">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                    isPaidLocally
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isPaidLocally ? 'Paid ✓' : 'Pay at Desk / UPI'}
                </span>
                <span className="text-[10px] text-[var(--brand-muted)] block mt-0.5">
                  Includes 5% Govt. GST
                </span>
              </div>
            </div>

            {/* Payment Choice Buttons */}
            {!isPaidLocally ? (
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  onClick={() => setShowUpiModal(true)}
                  className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active-press cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pay with UPI</span>
                </button>

                <button
                  onClick={() =>
                    handleCallService(`Counter notified: ${displayTableLabel} will settle bill by Cash/Card.`)
                  }
                  className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-200 active-press cursor-pointer"
                >
                  <Banknote className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Pay at Counter</span>
                </button>
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Payment recorded for {displayTableLabel}.</span>
              </div>
            )}

            {/* Service Alert Notice (Shown down here near Pay at Counter & Call Water) */}
            {serviceAlert && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{serviceAlert}</span>
              </div>
            )}
          </div>

          {/* Itemized Order Details Accordion */}
          <div className="bg-white rounded-2xl border border-[var(--brand-border)] overflow-hidden shadow-2xs">
            <button
              onClick={() => setIsReceiptOpen((prev) => !prev)}
              className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-[var(--brand-text)] hover:bg-zinc-50 active-press"
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[var(--brand-primary)]" />
                <span>View Order Items ({order.items.reduce((a, b) => a + b.quantity, 0)} items)</span>
              </div>
              {isReceiptOpen ? (
                <ChevronUp className="w-4 h-4 text-zinc-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            {isReceiptOpen && (
              <div className="p-3.5 pt-0 border-t border-[var(--brand-border)] space-y-2 text-xs divide-y divide-zinc-100 animate-in fade-in">
                <div className="pt-2 space-y-2">
                  {order.items.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-zinc-100 text-zinc-700 font-bold text-[11px] flex items-center justify-center">
                          {cartItem.quantity}×
                        </span>
                        <span className="font-semibold text-zinc-800">
                          {cartItem.item.name}
                        </span>
                      </div>
                      <span className="tabular-nums font-bold text-zinc-900">
                        ₹{cartItem.item.price * cartItem.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {order.specialInstructions && (
                  <div className="pt-2 text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded-lg">
                    <span className="font-bold">Note for Kitchen: </span>
                    <span>{order.specialInstructions}</span>
                  </div>
                )}

                <div className="pt-2.5 space-y-1 text-xs text-[var(--brand-muted)]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums text-zinc-700">₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="tabular-nums text-zinc-700">₹{order.gst}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[var(--brand-text)] pt-1 border-t border-zinc-200">
                    <span>Grand Total</span>
                    <span className="tabular-nums font-black text-sm text-zinc-950">
                      ₹{order.total}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-zinc-50 border-t border-[var(--brand-border)] flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOrderMore();
            }}
            className="flex-1 h-11 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-accent)] text-zinc-950 font-black text-xs tracking-wide flex items-center justify-center gap-2 shadow-xs active-press border border-black/10 transition-colors"
          >
            <span>Order More Dishes</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
        </>
        )}
      </div>

      {/* UPI QR Payment Overlay Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={() => setShowUpiModal(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl z-10 border border-zinc-200 text-center space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Dr. Joos Cafe Indore UPI
              </span>
              <button
                onClick={() => setShowUpiModal(false)}
                className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* UPI QR Visual Box */}
            <div className="p-4 bg-zinc-50 rounded-2xl border-2 border-dashed border-purple-200 flex flex-col items-center space-y-3">
              <div className="w-44 h-44 bg-white p-2 rounded-xl shadow-xs border border-zinc-200 flex flex-col items-center justify-center">
                {/* SVG QR Code Simulation */}
                <svg
                  className="w-36 h-36"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#581C87" rx="3" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#581C87" />

                  <rect x="65" y="10" width="25" height="25" fill="#581C87" rx="3" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#581C87" />

                  <rect x="10" y="65" width="25" height="25" fill="#581C87" rx="3" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#581C87" />

                  <rect x="42" y="12" width="6" height="6" fill="#581C87" />
                  <rect x="52" y="18" width="6" height="6" fill="#581C87" />
                  <rect x="42" y="42" width="16" height="16" fill="#581C87" rx="2" />
                  <rect x="46" y="46" width="8" height="8" fill="white" />
                  <rect x="65" y="42" width="8" height="8" fill="#581C87" />
                  <rect x="78" y="52" width="10" height="8" fill="#581C87" />
                  <rect x="65" y="65" width="12" height="12" fill="#581C87" />
                  <rect x="80" y="80" width="10" height="10" fill="#581C87" />
                  <rect x="42" y="75" width="8" height="12" fill="#581C87" />
                </svg>
                <span className="text-[10px] font-bold text-purple-900 mt-1">
                  Scan to Pay ₹{order.total}
                </span>
              </div>

              {/* UPI ID copy */}
              <div className="w-full flex items-center justify-between bg-white border border-zinc-200 rounded-xl px-3 py-1.5">
                <span className="text-xs font-mono font-semibold text-zinc-700">
                  drjoos.indore@okaxis
                </span>
                <button
                  onClick={handleCopyUpi}
                  className="text-xs text-purple-700 font-bold flex items-center gap-1 active-press"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action buttons in QR modal */}
            <div className="space-y-2">
              <button
                onClick={handleConfirmUpiPaid}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active-press flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>I Have Completed Payment</span>
              </button>

              <button
                onClick={() => setShowUpiModal(false)}
                className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-700"
              >
                Back to Order Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
