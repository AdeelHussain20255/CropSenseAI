"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Phone, 
  Copy, 
  ExternalLink, 
  Store,
  Filter,
  CheckCircle2,
  Navigation
} from "lucide-react";
import { allSuppliers, Supplier } from "@/lib/diseases";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const cities = ["All", "Karachi", "Lahore", "Faisalabad", "Multan", "Peshawar", "Rawalpindi", "Hyderabad", "Sialkot"];

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCity, setActiveCity] = useState("All");

  const filteredSuppliers = allSuppliers.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = activeCity === "All" || s.city === activeCity;
    
    return matchesSearch && matchesCity;
  });

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast("Phone number copied!", "success");
  };

  const openInMaps = (city: string) => {
    window.open(`https://www.google.com/maps/search/${city}+Agricultural+Suppliers`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full text-accent text-sm font-medium mb-6"
        >
          <Store size={16} /> Certified Agricultural Partners
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Suppliers Directory</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Connect with trusted suppliers across Pakistan for authentic fertilizers, seeds, and crop protection tools.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-8 mb-12">
        <div className="relative max-w-2xl mx-auto w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted" size={24} />
          <input 
            type="text" 
            placeholder="Search by name, city, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-[2rem] pl-16 pr-8 py-5 text-lg text-white focus:outline-none focus:border-accent transition-all placeholder:text-muted/50"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium border transition-all",
                activeCity === city 
                  ? "bg-accent border-accent text-background" 
                  : "bg-transparent border-border text-muted hover:border-accent hover:text-accent"
              )}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted text-xl italic">No suppliers found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredSuppliers.map((supplier, idx) => (
              <motion.div
                key={supplier.name + idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card p-6 rounded-[2rem] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Store className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{supplier.name}</h3>
                      <p className="text-xs text-accent font-medium">{supplier.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <MapPin size={18} className="text-accent" />
                      {supplier.city}, Pakistan
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <Phone size={18} className="text-accent" />
                      {supplier.phone}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => copyPhone(supplier.phone)}
                    className="flex-1 bg-border/50 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-background transition-all"
                  >
                    <Copy size={16} /> Copy
                  </button>
                  <button 
                    onClick={() => openInMaps(supplier.city)}
                    className="w-12 bg-border/50 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-white hover:text-background transition-all"
                    title="View on Maps"
                  >
                    <Navigation size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Trust Badge */}
      <div className="mt-24 p-12 glass rounded-[3rem] text-center border border-accent/20">
        <h3 className="text-2xl font-bold text-white mb-4">Are you a supplier?</h3>
        <p className="text-muted mb-8 max-w-xl mx-auto">Join our network of certified agricultural partners and help farmers across the country protect their crops.</p>
        <button className="bg-white text-background px-10 py-4 rounded-2xl font-bold hover:bg-accent transition-all">
          Apply to Join Directory
        </button>
      </div>
    </div>
  );
}
