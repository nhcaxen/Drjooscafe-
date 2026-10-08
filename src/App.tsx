import React, { useState, useMemo, useRef } from 'react';
import { MENU_ITEMS, CATEGORIES } from './data/menuData';
import { MenuItem, CartItem, PlacedOrder } from './types/menu';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { FeaturedItems } from './components/FeaturedItems';
import { MenuSection } from './components/MenuSection';
import { ItemBottomSheet } from './components/ItemBottomSheet';
import { CartBar } from './components/CartBar';
import { CartDrawer } from './components/CartDrawer';
import { VegIndicator } from './components/VegIndicator';
import { OrderStatusModal } from './components/OrderStatusModal';
import { ActiveOrderWidget } from './components/ActiveOrderWidget';
import { TableSelectorModal } from './components/TableSelectorModal';
import { DesktopCartSidebar } from './components/DesktopCartSidebar';
import { Search, MapPin, Sparkles, CheckCircle2, ShieldCheck, ChevronDown } from 'lucide-react';

export default function App() {
  const [tableNumber, setTableNumber] = useState<string>(() => {
    try {
      return localStorage.getItem('dr_joos_table') || '04';
    } catch {
      return '04';
    }
  });
  const [isTableSelectorOpen, setIsTableSelectorOpen] = useState(false);

  // Dynamic Time Greeting
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      return {
        greeting: 'Good Morning! ☀️',
        subtext: 'Fresh fruit juices, shakes & breakfast',
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: 'Good Afternoon! 🌤️',
        subtext: 'Refreshing sips & cool cafe treats',
      };
    } else if (hour >= 17 && hour < 22) {
      return {
        greeting: 'Good Evening! 🌙',
        subtext: 'Cozy juices, sandwiches & fresh bites',
      };
    } else {
      return {
        greeting: 'Late Night Cravings! ✨',
        subtext: 'Midnight coolers & healthy sips',
      };
    }
  }, []);

  const handleSelectTable = (table: string) => {
    setTableNumber(table);
    try {
      localStorage.setItem('dr_joos_table', table);
    } catch {}
  };

  // State
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Placed Order & Tracking State
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(() => {
    try {
      const saved = localStorage.getItem('dr_joos_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [isJustPlaced, setIsJustPlaced] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Toggle Search Bar Focus
  const handleToggleSearch = () => {
    setIsSearchVisible((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      } else {
        setSearchQuery('');
      }
      return next;
    });
  };

  // Quantity query helper
  const getItemQuantity = (item: MenuItem) => {
    const match = cart.find((c) => c.item.id === item.id);
    return match ? match.quantity : 0;
  };

  // Add item
  const handleAddToCart = (item: MenuItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [...prev, { item, quantity: qty }];
    });
  };

  // Update quantity
  const handleUpdateQuantity = (item: MenuItem, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === item.id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Update cart by item ID in drawer
  const handleUpdateCartQuantityById = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove single item from cart
  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Set explicit quantity for an item (used by bottom sheet)
  const handleSetCartQuantity = (item: MenuItem, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((c) => c.item.id !== item.id);
      }
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity } : c
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  // Place order & start kitchen tracking
  const handlePlaceOrder = (instructions?: string) => {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: PlacedOrder = {
      id: `DJ-${Math.floor(100 + Math.random() * 900)}`,
      tokenNumber: `T-${Math.floor(10 + Math.random() * 90)}`,
      tableNumber,
      createdAt: `${timeStr}, Today`,
      placedAtTimestamp: Date.now(),
      items: [...cart],
      subtotal,
      gst,
      total,
      specialInstructions: instructions,
      status: 'preparing',
      estimatedMinutes: 14,
      paymentMethod: 'counter',
      isPaid: false,
    };

    setPlacedOrder(newOrder);
    try {
      localStorage.setItem('dr_joos_active_order', JSON.stringify(newOrder));
    } catch {
      // Ignore localStorage errors
    }

    setCart([]);
    setIsCartOpen(false);
    setIsJustPlaced(true);
    setIsOrderStatusOpen(true);
  };

  // Update payment status
  const handleUpdatePayment = (isPaid: boolean) => {
    if (!placedOrder) return;
    const updated = { ...placedOrder, isPaid };
    setPlacedOrder(updated);
    try {
      localStorage.setItem('dr_joos_active_order', JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }
  };

  // Filtered menu logic
  const isSearching = searchQuery.trim().length > 0;

  const filteredItems = useMemo(() => {
    if (!isSearching) {
      return MENU_ITEMS;
    }
    const query = searchQuery.toLowerCase().trim();
    return MENU_ITEMS.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(query);
      const descMatch = item.description.toLowerCase().includes(query);
      const catMatch = item.category.toLowerCase().includes(query);
      return nameMatch || descMatch || catMatch;
    });
  }, [searchQuery, isSearching]);

  // Group by category
  const displayedCategories = useMemo(() => {
    if (isSearching) {
      // Group matched items by their existing categories
      return CATEGORIES.map((cat) => ({
        category: cat,
        items: filteredItems.filter((i) => i.category === cat),
      })).filter((group) => group.items.length > 0);
    }

    // When browsing normally, show the selected category or all
    return [
      {
        category: activeCategory,
        items: MENU_ITEMS.filter((i) => i.category === activeCategory),
      },
    ];
  }, [isSearching, filteredItems, activeCategory]);

  const totalCartCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <div className="min-h-screen bg-[var(--brand-background)] text-[var(--brand-text)] flex flex-col pb-28 lg:pb-12">
      {/* Top Header (Responsive max-w-7xl) */}
      <Header
        onToggleSearch={handleToggleSearch}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        tableNumber={tableNumber}
        onOpenTableSelector={() => setIsTableSelectorOpen(true)}
      />

      {/* Sub-header / Search & Greeting Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-3 pb-1">
        {/* Search Bar */}
        {(isSearchVisible || isSearching) && (
          <div className="mb-3 max-w-xl mx-auto lg:mx-0 animate-in fade-in duration-150">
            <SearchBar
              inputRef={searchInputRef}
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        )}

        {/* Time-Based Greeting & Table Chooser */}
        {!isSearching && (
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 mb-1">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-zinc-950 block leading-tight">
                {timeGreeting.greeting}
              </span>
              <span className="text-xs sm:text-sm text-[var(--brand-muted)] font-medium mt-0.5">
                {timeGreeting.subtext}
              </span>
            </div>

            {/* Mobile/Tablet Table Selector (Desktop has it in header and sidebar) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsTableSelectorOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 px-3 py-1.5 rounded-full transition-colors active-press cursor-pointer shrink-0 border border-zinc-200/60"
                title="Choose Table"
                aria-label="Choose table"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{tableNumber === 'Takeaway' ? 'Parcel' : (tableNumber ? `Table ${tableNumber}` : 'Choose Table')}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 stroke-[1.8]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Horizontal Category Navigation */}
      {!isSearching && (
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Responsive Main Layout: Menu Left + Sticky Cart Right on Desktop */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 flex-1">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Main Content Area */}
          <main className="lg:col-span-8 space-y-5 min-w-0">
            {/* Featured Picks Section (only on first category and not searching) */}
            {!isSearching && activeCategory === CATEGORIES[0] && (
              <FeaturedItems
                items={MENU_ITEMS}
                getItemQuantity={getItemQuantity}
                onOpenItem={(item) => setSelectedItem(item)}
                onAddToCart={(item) => handleAddToCart(item)}
                onUpdateQuantity={handleUpdateQuantity}
              />
            )}

            {/* Search Empty State */}
            {isSearching && displayedCategories.length === 0 && (
              <div className="py-16 text-center space-y-2 bg-white rounded-xl border border-[var(--brand-border)] p-6">
                <span className="text-3xl block">🔍</span>
                <h3 className="font-bold text-sm text-[var(--brand-text)]">
                  No dishes found for "{searchQuery}"
                </h3>
                <p className="text-xs text-[var(--brand-muted)] max-w-xs mx-auto">
                  Try searching for "pizza", "paneer", "cold coffee", "maggi", or "sandwich".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 px-3.5 py-1.5 rounded-lg bg-[var(--brand-primary)] text-zinc-950 text-xs font-black active-press border border-[var(--brand-accent)] shadow-xs cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Menu Sections & Dishes */}
            {displayedCategories.map((group) => (
              <MenuSection
                key={group.category}
                category={group.category}
                items={group.items}
                getItemQuantity={getItemQuantity}
                onOpenDetails={(item) => setSelectedItem(item)}
                onAddToCart={(item) => handleAddToCart(item)}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}

            {/* Cafe Footer & Info */}
            <footer className="pt-8 pb-6 border-t border-[var(--brand-border)] space-y-2.5 text-center text-xs text-[var(--brand-muted)]">
              <div className="flex items-center justify-center gap-1.5 font-bold text-sm text-[var(--brand-text)]">
                <span className="font-brand text-base text-zinc-950">Dr. <span className="text-[#889E00]">Joos</span></span>
                <span>Cafe, Indore</span>
              </div>

              <p className="text-[11px] text-[var(--brand-muted)]">
                400, Clerk Colony Rd, MR 9, Indore, Madhya Pradesh
              </p>

              <div className="flex items-center justify-center gap-3 text-[10px] text-[var(--brand-muted)] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Pure Veg Kitchen
                </span>
                <span>•</span>
                <span>FSSAI Lic. Certified</span>
                <span>•</span>
                <span>Taxes as applicable</span>
              </div>
            </footer>
          </main>

          {/* Desktop Right Sidebar (Cart & Live Order) */}
          <div className="hidden lg:block lg:col-span-4">
            <DesktopCartSidebar
              cart={cart}
              tableNumber={tableNumber}
              onOpenTableSelector={() => setIsTableSelectorOpen(true)}
              onUpdateQuantity={handleUpdateCartQuantityById}
              onRemoveItem={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onPlaceOrder={handlePlaceOrder}
              placedOrder={placedOrder}
              onOpenOrderStatus={() => {
                setIsJustPlaced(false);
                setIsOrderStatusOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Active Order Status Bar (Mobile only) */}
      {!isOrderStatusOpen && (
        <div className="lg:hidden">
          <ActiveOrderWidget
            order={placedOrder}
            onOpenStatus={() => {
              setIsJustPlaced(false);
              setIsOrderStatusOpen(true);
            }}
            hasItemsInCart={cart.length > 0}
          />
        </div>
      )}

      {/* Sticky Bottom Cart Bar (Mobile only) */}
      <div className="lg:hidden">
        <CartBar cart={cart} onOpenCart={() => setIsCartOpen(true)} />
      </div>

      {/* Item Detail Bottom Sheet */}
      <ItemBottomSheet
        item={selectedItem}
        initialQuantity={selectedItem ? getItemQuantity(selectedItem) : 0}
        onClose={() => setSelectedItem(null)}
        onSetQuantity={handleSetCartQuantity}
      />

      {/* Full Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantityById}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        tableNumber={tableNumber}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Full Order Confirmation & Live Tracking Screen */}
      <OrderStatusModal
        order={placedOrder}
        isOpen={isOrderStatusOpen}
        onClose={() => {
          setIsOrderStatusOpen(false);
          setIsJustPlaced(false);
        }}
        onOrderMore={() => {
          setIsOrderStatusOpen(false);
          setIsJustPlaced(false);
        }}
        onUpdatePayment={handleUpdatePayment}
        isJustPlaced={isJustPlaced}
      />

      {/* Table Chooser Modal */}
      <TableSelectorModal
        isOpen={isTableSelectorOpen}
        onClose={() => setIsTableSelectorOpen(false)}
        currentTable={tableNumber}
        onSelectTable={handleSelectTable}
      />
    </div>
  );
}
