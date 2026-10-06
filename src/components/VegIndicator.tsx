import React from 'react';

interface VegIndicatorProps {
  size?: 'sm' | 'md';
}

export const VegIndicator: React.FC<VegIndicatorProps> = ({ size = 'sm' }) => {
  const isSm = size === 'sm';
  return (
    <span
      className={`inline-flex items-center justify-center border border-[#16A34A] rounded-[3px] bg-white shrink-0 ${
        isSm ? 'w-3.5 h-3.5 p-[2px]' : 'w-4 h-4 p-[2.5px]'
      }`}
      title="100% Pure Vegetarian"
      aria-label="Vegetarian"
    >
      <span className="w-full h-full rounded-full bg-[#16A34A]" />
    </span>
  );
};
