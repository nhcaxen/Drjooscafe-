import React from 'react';
import { PlacedOrder } from '../types/menu';
import { Clock, ChevronRight } from 'lucide-react';

interface ActiveOrderWidgetProps {
  order: PlacedOrder | null;
  onOpenStatus: () => void;
  hasItemsInCart?: boolean;
}

export const ActiveOrderWidget: React.FC<ActiveOrderWidgetProps> = ({
  order,
  onOpenStatus,
  hasItemsInCart = false,
}) => {
  if (!order) return null;

  return (
    <div
      onClick={onOpenStatus}
      className={`fixed left-0 right-0 z-40 px-3 cursor-pointer transition-all duration-300 max-w-md mx-auto ${
        hasItemsInCart ? 'bottom-18' : 'bottom-3'
      }`}
    >
      <div className="bg-zinc-950/95 backdrop-blur-md text-white rounded-2xl p-3 shadow-2xl border border-zinc-800/80 flex items-center justify-between active-press hover:bg-zinc-900 transition-colors">
        <div className="flex items-center gap-3">
          {/* Circular Chef Cooking / Sizzling Pan Badge */}
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            {/* Subtle heat radiation ring */}
            <span className="absolute inset-0 rounded-full bg-amber-500/15 animate-ping opacity-30 pointer-events-none" />

            {/* Dark Circular Pan Station */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-b from-zinc-850 to-zinc-950 border border-amber-500/35 flex items-center justify-center shadow-md shadow-amber-950/40 overflow-hidden">
              {/* Warm underglow beneath the pan */}
              <div className="absolute -bottom-1 inset-x-0 h-4 bg-gradient-to-t from-orange-500/30 to-transparent pointer-events-none" />

              {/* Sizzling Pan & Rising Steam SVG Scene */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Floating Steam Line 1 */}
                <path
                  className="animate-steam-1 text-amber-200/80"
                  d="M8.5 7C8.5 5.5 9.5 4.5 9.5 3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Floating Steam Line 2 */}
                <path
                  className="animate-steam-2 text-amber-300/80"
                  d="M12 8C12 6.2 13.2 5 13.2 3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />

                {/* Animated Small Stove Flames 🔥 Under Pan */}
                <g className="burner-flames">
                  {/* Left flame tongue */}
                  <path
                    className="animate-burner-flame-2"
                    d="M5.8 21.5C5.8 20.2 6.8 19.2 6.8 18.2C7.3 18.9 7.6 19.7 7.6 20.6C7.6 21.2 7.1 21.6 6.6 21.6C6.2 21.6 5.8 21.5 5.8 21.5Z"
                    fill="#F97316"
                  />
                  {/* Center main glowing golden flame tongue */}
                  <path
                    className="animate-burner-flame-1"
                    d="M8.6 22C8.6 20.2 9.8 18.4 9.8 17C10.6 18.1 11 19.3 11 20.6C11 21.6 10.2 22.2 9.3 22.2C8.9 22.2 8.6 22.1 8.6 22Z"
                    fill="#FBBF24"
                  />
                  {/* Right flame tongue */}
                  <path
                    className="animate-burner-flame-3"
                    d="M11.4 21.5C11.4 20.2 12.4 19.2 12.4 18.2C12.9 18.9 13.2 19.7 13.2 20.6C13.2 21.2 12.7 21.6 12.2 21.6C11.8 21.6 11.4 21.5 11.4 21.5Z"
                    fill="#EF4444"
                  />
                  {/* Inner intense yellow burner glow */}
                  <ellipse cx="9.2" cy="21.2" rx="2.8" ry="0.6" fill="#FEF08A" opacity="0.85" />
                </g>

                {/* Sizzling Pan with Food Toss */}
                <g className="animate-pan-toss">
                  {/* Pan Body (Non-stick modern skillet) */}
                  <path
                    d="M3 13.5C3 16.5 5.5 19 9 19C12.5 19 15 16.5 15 13.5H3Z"
                    fill="#3F3F46"
                    stroke="#D4D4D8"
                    strokeWidth="0.8"
                  />
                  {/* Pan Rim Highlight */}
                  <ellipse cx="9" cy="13.5" rx="6" ry="1.2" fill="#52525B" />

                  {/* Long Pan Handle */}
                  <path
                    d="M14.8 14.2L20.5 16C21 16.2 21.2 16.8 21 17.2C20.8 17.6 20.2 17.8 19.8 17.6L14.4 15.5"
                    stroke="#A1A1AA"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />

                  {/* Sizzling Tossed Fresh Food Ingredients */}
                  <g className="animate-food-jump">
                    {/* Golden Paneer / Corn cubes */}
                    <circle cx="7" cy="12.5" r="1.1" fill="#FBBF24" />
                    <circle cx="10.5" cy="11.8" r="1.2" fill="#F59E0B" />
                    {/* Fresh Herb / Veggie Green Pop */}
                    <circle cx="8.8" cy="11" r="0.9" fill="#84CC16" />
                    <circle cx="12" cy="12.8" r="0.8" fill="#4ADE80" />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Clean Order Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wide text-white">
                Order #{order.id}
              </span>
              <span className="text-[10px] font-bold text-zinc-400">
                Token {order.tokenNumber}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
              <span className="flex items-center gap-1 text-zinc-300 font-medium">
                <Clock className="w-3 h-3 text-amber-400" />
                ~12-14 mins
              </span>
              <span>•</span>
              <span className="text-zinc-300 font-medium">
                {order.tableNumber === 'Takeaway' ? 'Parcel' : `Table ${order.tableNumber}`}
              </span>
            </div>
          </div>
        </div>

        {/* Live Status CTA */}
        <div className="flex items-center gap-1 text-xs font-black text-[var(--brand-primary)] shrink-0 pl-3">
          <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)] animate-ping mr-0.5" />
          <span>Live Status</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    </div>
  );
};
