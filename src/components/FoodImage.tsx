import React, { useState } from 'react';

interface FoodImageProps {
  src?: string;
  alt: string;
  category: string;
  name: string;
  size?: 'card' | 'featured' | 'detail';
  className?: string;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  category,
  name,
  size = 'card',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // Fallback themes based on dish type
  const getFallbackTheme = () => {
    const lower = name.toLowerCase();
    if (lower.includes('coffee')) {
      return { bg: 'from-[#3E2723] to-[#5D4037]', icon: '☕', label: 'Cold Coffee' };
    }
    if (lower.includes('juice') || lower.includes('lime') || lower.includes('lemonade') || lower.includes('shake')) {
      if (lower.includes('anar')) return { bg: 'from-[#881337] to-[#BE123C]', icon: '🥤', label: 'Fresh Anar' };
      if (lower.includes('pineapple')) return { bg: 'from-[#854D0E] to-[#CA8A04]', icon: '🍍', label: 'Pineapple' };
      if (lower.includes('watermelon')) return { bg: 'from-[#9F1239] to-[#E11D48]', icon: '🍉', label: 'Watermelon' };
      if (lower.includes('mango')) return { bg: 'from-[#B45309] to-[#F59E0B]', icon: '🥭', label: 'Mango Shake' };
      return { bg: 'from-[#B91C1C] to-[#EF4444]', icon: '🥤', label: 'Fresh Juice' };
    }
    if (lower.includes('pizza')) {
      return { bg: 'from-[#991B1B] to-[#DC2626]', icon: '🍕', label: 'Pizza' };
    }
    if (lower.includes('burger')) {
      return { bg: 'from-[#92400E] to-[#D97706]', icon: '🍔', label: 'Burger' };
    }
    if (lower.includes('sandwich') || lower.includes('toast')) {
      return { bg: 'from-[#78350F] to-[#B45309]', icon: '🥪', label: 'Sandwich' };
    }
    if (lower.includes('maggi') || lower.includes('pasta') || lower.includes('noodle')) {
      return { bg: 'from-[#B45309] to-[#F59E0B]', icon: '🍝', label: 'Maggi / Pasta' };
    }
    if (lower.includes('fries')) {
      return { bg: 'from-[#854D0E] to-[#EAB308]', icon: '🍟', label: 'Fries' };
    }
    if (lower.includes('momo')) {
      return { bg: 'from-[#374151] to-[#6B7280]', icon: '🥟', label: 'Momos' };
    }
    if (lower.includes('salad') || lower.includes('sprout')) {
      return { bg: 'from-[#14532D] to-[#16A34A]', icon: '🥗', label: 'Fresh Salad' };
    }
    if (lower.includes('pav bhaji') || lower.includes('chole') || lower.includes('rice') || lower.includes('idli') || lower.includes('dal')) {
      return { bg: 'from-[#7C2D12] to-[#C2410C]', icon: '🍛', label: 'Platter' };
    }
    if (lower.includes('brownie') || lower.includes('corn') || lower.includes('vada')) {
      return { bg: 'from-[#713F12] to-[#A16207]', icon: '🍿', label: 'Snacks' };
    }

    return { bg: 'from-[#991B1B] to-[#DC2626]', icon: '🍽️', label: category };
  };

  const theme = getFallbackTheme();

  const containerSizes = {
    card: 'w-22 h-22 sm:w-24 sm:h-24 rounded-xl',
    featured: 'w-full h-28 rounded-xl',
    detail: 'w-full h-48 rounded-xl',
  }[size];

  const iconSizes = {
    card: 'text-3xl',
    featured: 'text-3xl',
    detail: 'text-5xl',
  }[size];

  return (
    <div
      className={`relative overflow-hidden bg-zinc-200 flex items-center justify-center shrink-0 border border-zinc-200/80 shadow-2xs select-none ${containerSizes} ${className}`}
    >
      {/* Real Photography Image */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        /* Styled Fallback container */
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.bg} flex flex-col items-center justify-center text-white p-2`}
        >
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
          <span className={`${iconSizes} filter drop-shadow-sm`}>
            {theme.icon}
          </span>
          {size !== 'card' && (
            <span className="text-[10px] font-semibold text-white/90 tracking-wide mt-1 truncate max-w-[90%]">
              {theme.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
