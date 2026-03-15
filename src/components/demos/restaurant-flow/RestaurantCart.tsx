"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Trash2, ArrowRight } from "lucide-react";
import { MenuItem } from "./RestaurantMenu";
import { Button } from "@/components/ui/Button";

interface RestaurantCartProps {
  items: (MenuItem & { quantity: number })[];
  onRemove: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function RestaurantCart({ 
  items, 
  onRemove, 
  isOpen, 
  setIsOpen 
}: RestaurantCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-70 w-16 h-16 bg-accent text-background rounded-full shadow-2xl shadow-accent/20 flex items-center justify-center group"
      >
        <ShoppingBag size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-background rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-accent">
            {itemCount}
          </span>
        )}
      </motion.button>

      {/* Cart Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-80"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0D100E] z-90 shadow-2xl border-l border-white/5 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-accent" size={24} />
                  <h2 className="text-2xl font-bold text-white tracking-tight">Your Order</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-center space-y-4">
                    <p className="text-gray-500">Your basket is feeling light.</p>
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsOpen(false)}
                      className="text-accent hover:text-accent-hover"
                    >
                      Start adding flavors
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-surface border border-white/5 shrink-0 overflow-hidden relative">
                         <div className="absolute inset-0 bg-accent/5 flex items-center justify-center text-[8px] text-accent/30 p-1 text-center font-bold uppercase tracking-tighter">
                            {item.name}
                         </div>
                      </div>
                      <div className="grow space-y-1">
                        <div className="flex justify-between">
                          <h4 className="text-white font-medium text-sm">{item.name}</h4>
                          <span className="text-accent text-sm">${item.price * item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="p-1.5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="text-2xl font-bold text-white">${total}</span>
                </div>
                
                <Button 
                  disabled={items.length === 0}
                  className="w-full h-14 bg-accent hover:bg-accent-hover text-background group rounded-xl"
                >
                  Place Order
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest leading-loose">
                  * This is an interactive MVP experience. <br /> Demo mode activated.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
