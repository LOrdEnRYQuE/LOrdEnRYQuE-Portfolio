"use client";

import { useState } from "react";
import DemoLayout from "@/components/demos/DemoLayout";
import RestaurantHero from "@/components/demos/restaurant-flow/RestaurantHero";
import RestaurantMenu, { MenuItem } from "@/components/demos/restaurant-flow/RestaurantMenu";
import RestaurantCart from "@/components/demos/restaurant-flow/RestaurantCart";
import BookingModal from "@/components/demos/restaurant-flow/BookingModal";
import Footer from "@/components/layout/Footer";

export default function RestaurantPrototypePage() {
  const [cartItems, setCartItems] = useState<(MenuItem & { quantity: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Optional: Open cart on first add
    if (cartItems.length === 0) setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleBookTable = () => {
    setIsBookingOpen(true);
  };

  return (
    <DemoLayout
      demoTitle="RestaurantFlow"
      backUrl="/demo-branches/restaurantflow"
    >
      <div className="relative">
        {/* Custom Hero logic for demo trigger */}
        <div onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.textContent?.includes("Book")) handleBookTable();
        }}>
           <RestaurantHero />
        </div>
        
        <RestaurantMenu onAddToCart={handleAddToCart} />
        
        <RestaurantCart 
          items={cartItems} 
          onRemove={handleRemoveFromCart}
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
        />

        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
        />

        {/* Branded Lite Footer for Discovery */}
        <footer className="py-20 bg-[#0A0D0B] border-t border-white/5 text-center px-6">
            <h4 className="text-accent italic font-serif text-2xl mb-4">LOrdEnRYQuE RestaurantFlow</h4>
            <p className="text-gray-500 text-sm tracking-widest uppercase">Premium Business Demo</p>
        </footer>
      </div>
    </DemoLayout>
  );
}
